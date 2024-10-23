import fs from 'fs/promises'
import path from 'path'
import { fileURLToPath } from 'url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const ROOT_DIR = path.join(__dirname, '..')

// Simple console colors
const colors = {
  reset: "\x1b[0m",
  red: "\x1b[31m",
  green: "\x1b[32m",
  blue: "\x1b[34m"
}

// Define all required files and their expected locations
const requiredFiles = {
  // Core files
  'src/lib/errors.ts': {
    type: 'new',
    description: 'Error handling utilities'
  },
  'src/lib/auth/rbac.ts': {
    type: 'new',
    description: 'Role-based access control'
  },
  'src/types/auth.ts': {
    type: 'new',
    description: 'Authentication types'
  },
  'src/config/navigation/main.json': {
    type: 'new',
    description: 'Navigation configuration'
  },
  'scripts/update-nav.mjs': {
    type: 'new',
    description: 'Navigation update script'
  },
  
  // Modified files
  'src/components/Bar/nav-main.tsx': {
    type: 'modified',
    description: 'Main navigation component',
    requiredImports: [
      '@/lib/errors',
      'lucide-react',
      '@/components/ui/button'
    ]
  },
  'src/components/Bar/nav-secondary.tsx': {
    type: 'modified',
    description: 'Secondary navigation component',
    requiredImports: [
      'lucide-react',
      '@/components/ui/button'
    ]
  },
  'src/components/Bar/nav-user.tsx': {
    type: 'modified',
    description: 'User navigation component',
    requiredImports: [
      '@/hooks/use-toast',  // Updated from @/components/ui/use-toast
      '@/components/ui/button',
      '@/components/ui/dropdown-menu'
    ]
  },
  'src/components/Bar/nav-projects.tsx': {
    type: 'modified',
    description: 'Projects navigation component',
    requiredImports: [
      'lucide-react',
      '@/components/ui/button'
    ]
  },
  'src/components/app-sidebar.tsx': {
    type: 'modified',
    description: 'Main sidebar component',
    requiredImports: [
      'lucide-react',
      '@/components/Bar/nav-main',
      '@/components/Bar/nav-secondary',
      '@/components/Bar/nav-user',
      '@/components/Bar/nav-projects'
    ]
  },
  
  // API Routes
  'src/app/api/auth/logout/route.ts': {
    type: 'new',
    description: 'Logout API endpoint'
  },
  'src/app/api/navigation/main/route.ts': {
    type: 'new',
    description: 'Main navigation API endpoint'
  },
  'src/app/api/navigation/secondary/route.ts': {
    type: 'new',
    description: 'Secondary navigation API endpoint'
  }
}

// Define required dependencies
const requiredDependencies = [
  '@prisma/client',
  'lucide-react',
  '@t3-oss/env-nextjs',
  'zod'
]

async function checkFile(filePath, config) {
  const fullPath = path.join(ROOT_DIR, filePath)
  
  try {
    const fileExists = await fs.access(fullPath)
      .then(() => true)
      .catch(() => false)

    if (!fileExists) {
      return {
        success: false,
        error: `Missing ${config.type} file: ${filePath}`
      }
    }

    // Check imports for modified files
    if (config.type === 'modified' && config.requiredImports) {
      const content = await fs.readFile(fullPath, 'utf-8')
      const missingImports = config.requiredImports.filter(
        importPath => !content.includes(importPath)
      )

      if (missingImports.length > 0) {
        return {
          success: false,
          error: `Missing imports in ${filePath}: ${missingImports.join(', ')}`
        }
      }
    }

    return {
      success: true,
      message: `Found ${filePath}`
    }
  } catch (error) {
    return {
      success: false,
      error: `Error checking ${filePath}: ${error.message}`
    }
  }
}

async function checkDependencies() {
  try {
    const packageJsonPath = path.join(ROOT_DIR, 'package.json')
    const packageJson = JSON.parse(await fs.readFile(packageJsonPath, 'utf-8'))
    const allDeps = {
      ...packageJson.dependencies,
      ...packageJson.devDependencies
    }

    const missingDeps = requiredDependencies.filter(dep => !allDeps[dep])
    
    // Check required scripts
    const requiredScripts = {
      'update-nav': 'node scripts/update-nav.mjs',
      'dev:nav': 'concurrently "next dev" "node scripts/update-nav.mjs --watch"'
    }

    const missingScripts = Object.entries(requiredScripts)
      .filter(([script]) => !packageJson.scripts?.[script])
      .map(([script]) => script)

    return {
      missingDeps,
      missingScripts
    }
  } catch (error) {
    throw new Error(`Error checking package.json: ${error.message}`)
  }
}

async function validateSetup() {
  console.log(`${colors.blue}\n🔍 Validating project setup...\n${colors.reset}`)

  const results = {
    valid: [],
    issues: []
  }

  // Check all required files
  for (const [filePath, config] of Object.entries(requiredFiles)) {
    const result = await checkFile(filePath, config)
    if (result.success) {
      results.valid.push(result.message)
    } else {
      results.issues.push(result.error)
    }
  }

  // Check dependencies and scripts
  try {
    const { missingDeps, missingScripts } = await checkDependencies()
    
    missingDeps.forEach(dep => {
      results.issues.push(`Missing dependency: ${dep}`)
    })
    
    missingScripts.forEach(script => {
      results.issues.push(`Missing script '${script}' in package.json`)
    })
  } catch (error) {
    results.issues.push(error.message)
  }

  // Print results
  console.log(`${colors.blue}📝 Validation Results:\n${colors.reset}`)
  
  if (results.valid.length > 0) {
    console.log(`${colors.green}Found Files:${colors.reset}`)
    results.valid.forEach(msg => 
      console.log(`${colors.green}✅ ${msg}${colors.reset}`)
    )
    console.log()
  }

  if (results.issues.length > 0) {
    console.log(`${colors.red}Issues Found:${colors.reset}`)
    results.issues.forEach(msg => 
      console.log(`${colors.red}❌ ${msg}${colors.reset}`)
    )
    console.log()
    
    console.log(`${colors.red}❌ Setup validation failed. Please address the issues above.${colors.reset}`)
    process.exit(1)
  } else {
    console.log(`${colors.green}✅ All required files and configurations are present!${colors.reset}`)
    process.exit(0)
  }
}

// Run validation
validateSetup().catch(error => {
  console.error(`${colors.red}Error running validation:${colors.reset}`, error)
  process.exit(1)
})