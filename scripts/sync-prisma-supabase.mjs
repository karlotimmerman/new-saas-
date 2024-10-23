import { spawn } from 'child_process'
import { fileURLToPath } from 'url'
import path from 'path'
import fs from 'fs/promises'
import dotenv from 'dotenv'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const ROOT_DIR = path.join(__dirname, '..')

// Load environment variables
dotenv.config({ path: '.env.local' })

// ANSI color codes for better output
const colors = {
  reset: "\x1b[0m",
  red: "\x1b[31m",
  green: "\x1b[32m",
  yellow: "\x1b[33m",
  blue: "\x1b[34m",
  magenta: "\x1b[35m",
  cyan: "\x1b[36m",
}

// Execute command and return promise
function execCommand(command, args = []) {
  return new Promise((resolve, reject) => {
    console.log(`${colors.blue}> ${command} ${args.join(' ')}${colors.reset}`)
    
    const child = spawn(command, args, {
      stdio: ['inherit', 'pipe', 'pipe'],
      shell: true
    })

    let output = ''
    let errorOutput = ''

    child.stdout?.on('data', (data) => {
      output += data.toString()
      process.stdout.write(data)
    })

    child.stderr?.on('data', (data) => {
      errorOutput += data.toString()
      process.stderr.write(data)
    })

    child.on('error', reject)
    child.on('exit', code => {
      if (code === 0) resolve(output)
      else reject(new Error(`Command failed with exit code ${code}\n${errorOutput}`))
    })
  })
}

async function checkRequirements() {
  console.log(`${colors.cyan}Checking requirements...${colors.reset}`)
  
  // Check for required environment variables
  const requiredEnvVars = [
    'DATABASE_URL',
    'DIRECT_URL',
    'NEXT_PUBLIC_SUPABASE_URL',
    'NEXT_PUBLIC_SUPABASE_ANON_KEY'
  ]

  for (const envVar of requiredEnvVars) {
    if (!process.env[envVar]) {
      throw new Error(`Missing required environment variable: ${envVar}`)
    }
  }

  // Check for Prisma schema
  try {
    await fs.access(path.join(ROOT_DIR, 'prisma', 'schema.prisma'))
  } catch {
    throw new Error('schema.prisma not found in prisma directory')
  }

  // Check for required dependencies
  const packageJson = JSON.parse(
    await fs.readFile(path.join(ROOT_DIR, 'package.json'), 'utf-8')
  )

  const requiredDeps = ['@prisma/client', 'prisma']
  for (const dep of requiredDeps) {
    if (
      !packageJson.dependencies?.[dep] &&
      !packageJson.devDependencies?.[dep]
    ) {
      throw new Error(`Missing required dependency: ${dep}`)
    }
  }
}

async function ensureGitClean() {
  try {
    const status = await execCommand('git status --porcelain')
    if (status.trim()) {
      throw new Error('Git working directory is not clean. Please commit or stash changes first.')
    }
  } catch (error) {
    if (error.message.includes('not a git repository')) {
      console.log(`${colors.yellow}Warning: Not a git repository${colors.reset}`)
      return
    }
    throw error
  }
}

async function syncPrismaSupabase() {
  try {
    // Check requirements first
    await checkRequirements()
    await ensureGitClean()

    console.log(`${colors.magenta}\nStarting Prisma to Supabase sync...${colors.reset}\n`)

    // Step 1: Format and validate Prisma schema
    console.log(`${colors.cyan}Formatting and validating schema...${colors.reset}`)
    await execCommand('npx prisma format')
    await execCommand('npx prisma validate')

    // Step 2: Generate fresh Prisma client
    console.log(`\n${colors.cyan}Generating Prisma client...${colors.reset}`)
    await execCommand('npx prisma generate')

    // Step 3: Create migration
    const timestamp = new Date().toISOString().replace(/[^0-9]/g, '').slice(0, 14)
    const migrationName = `sync_${timestamp}`
    
    console.log(`\n${colors.cyan}Creating migration...${colors.reset}`)
    try {
      await execCommand(`npx prisma migrate dev --name ${migrationName} --create-only`)
    } catch (error) {
      if (!error.message.includes('already exists')) throw error
    }

    // Step 4: Apply migration to Supabase
    console.log(`\n${colors.cyan}Applying migration to Supabase...${colors.reset}`)
    await execCommand('npx prisma migrate deploy')

    // Step 5: Push any remaining changes
    console.log(`\n${colors.cyan}Pushing any remaining schema changes...${colors.reset}`)
    await execCommand('npx prisma db push')

    // Step 6: Verify database schema
    console.log(`\n${colors.cyan}Verifying database schema...${colors.reset}`)
    await execCommand('npx prisma db pull --force')
    
    // Step 7: Regenerate client with latest schema
    console.log(`\n${colors.cyan}Regenerating Prisma client...${colors.reset}`)
    await execCommand('npx prisma generate')

    console.log(`\n${colors.green}✨ Sync completed successfully!${colors.reset}\n`)

  } catch (error) {
    console.error(`\n${colors.red}Error during sync:${colors.reset}`)
    console.error(error.message)
    process.exit(1)
  }
}

// Add command line arguments parsing
const args = process.argv.slice(2)
if (args.includes('--help') || args.includes('-h')) {
  console.log(`
${colors.cyan}Prisma Supabase Sync${colors.reset}

Synchronizes your Prisma schema with Supabase database.

${colors.yellow}Usage:${colors.reset}
  pnpm run sync-prisma

${colors.yellow}Options:${colors.reset}
  --help, -h    Show this help message

${colors.yellow}Requirements:${colors.reset}
  - Valid DATABASE_URL and DIRECT_URL in .env
  - Prisma schema file
  - Clean git working directory (recommended)
  `)
  process.exit(0)
}

// Run the sync
syncPrismaSupabase().catch(error => {
  console.error(`\n${colors.red}Unexpected error:${colors.reset}`, error)
  process.exit(1)
})
