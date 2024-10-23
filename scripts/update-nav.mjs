import fs from 'fs/promises'
import path from 'path'
import { fileURLToPath } from 'url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const ROOT_DIR = path.join(__dirname, '..')

const ICON_MAPPINGS = {
  admin: 'ShieldCheck',
  dashboard: 'LayoutDashboard',
  users: 'Users',
  billing: 'CreditCard',
  usage: 'BarChart2',
  cost: 'DollarSign',
  limits: 'Sliders',
  support: 'LifeBuoy',
  feedback: 'Send',
  default: 'Circle'
}

async function scanDirectory(dir) {
  const entries = await fs.readdir(dir, { withFileTypes: true })
  const routes = []

  for (const entry of entries) {
    if (entry.isDirectory() && !entry.name.startsWith('.')) {
      const fullPath = path.join(dir, entry.name)
      const relativePath = fullPath.replace(path.join(ROOT_DIR, 'src/app'), '')
      
      // Handle special cases
      if (entry.name === '@admin') {
        const adminRoutes = await scanAdminRoutes(fullPath)
        routes.push({
          title: 'Admin',
          url: '/@admin',
          icon: ICON_MAPPINGS.admin,
          items: adminRoutes
        })
        continue
      }

      // Skip auth and api directories
      if (entry.name === '(auth)' || entry.name === 'api') continue

      const hasPage = await fs.access(path.join(fullPath, 'page.tsx'))
        .then(() => true)
        .catch(() => false)

      if (hasPage) {
        const routeName = entry.name.replace(/^\(|\)$/g, '')
        routes.push({
          title: routeName.charAt(0).toUpperCase() + routeName.slice(1),
          url: relativePath.replace(/\/page$/, ''),
          icon: ICON_MAPPINGS[routeName.toLowerCase()] || ICON_MAPPINGS.default
        })
      }

      // Recursively scan subdirectories
      const subRoutes = await scanDirectory(fullPath)
      routes.push(...subRoutes)
    }
  }

  return routes
}

async function scanAdminRoutes(adminDir) {
  const entries = await fs.readdir(adminDir, { withFileTypes: true })
  const adminRoutes = []

  for (const entry of entries) {
    if (entry.isDirectory()) {
      const fullPath = path.join(adminDir, entry.name)
      const hasPage = await fs.access(path.join(fullPath, 'page.tsx'))
        .then(() => true)
        .catch(() => false)

      if (hasPage) {
        adminRoutes.push({
          title: entry.name.charAt(0).toUpperCase() + entry.name.slice(1),
          url: `/@admin/${entry.name}`,
          icon: ICON_MAPPINGS[entry.name.toLowerCase()] || ICON_MAPPINGS.default
        })
      }
    }
  }

  return adminRoutes
}

async function updateNavigation() {
  try {
    const appDir = path.join(ROOT_DIR, 'src/app')
    const routes = await scanDirectory(appDir)

    // Create navigation config
    const navConfig = {
      main: routes,
      secondary: [
        {
          title: 'Support',
          url: '/support',
          icon: ICON_MAPPINGS.support
        },
        {
          title: 'Feedback',
          url: '/feedback',
          icon: ICON_MAPPINGS.feedback
        }
      ]
    }

    // Ensure config directory exists
    const configDir = path.join(ROOT_DIR, 'src/config/navigation')
    await fs.mkdir(configDir, { recursive: true })

    // Write navigation config
    await fs.writeFile(
      path.join(configDir, 'main.json'),
      JSON.stringify(navConfig, null, 2)
    )

    console.log('Navigation configuration updated successfully!')
  } catch (error) {
    console.error('Error updating navigation:', error)
  }
}

// Run the update
updateNavigation()

// Watch for changes if --watch flag is provided
if (process.argv.includes('--watch')) {
  const chokidar = await import('chokidar')
  const watcher = chokidar.default.watch(path.join(ROOT_DIR, 'src/app'), {
    ignored: /(^|[\/\\])\../,
    persistent: true
  })

  watcher.on('change', (path) => {
    console.log('Change detected:', path)
    updateNavigation()
  })

  console.log('Watching for changes...')
}