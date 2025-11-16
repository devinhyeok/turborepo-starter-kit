// Install Electron binary if not already installed
const path = require('path')
const fs = require('fs')

function findElectronInstallScript() {
  // Try to find electron package in pnpm store
  // __dirname is apps/desktop/.erb/scripts, so go up 4 levels to root
  const rootPath = path.resolve(__dirname, '../../../..')
  const nodeModulesPath = path.join(rootPath, 'node_modules')

  // Check if electron exists in node_modules
  const electronPath = path.join(nodeModulesPath, 'electron')
  if (fs.existsSync(electronPath)) {
    const installPath = path.join(electronPath, 'install.js')
    if (fs.existsSync(installPath)) {
      return installPath
    }
  }

  // Try to find in .pnpm directory (pnpm structure)
  try {
    const pnpmPath = path.join(nodeModulesPath, '.pnpm')
    if (fs.existsSync(pnpmPath)) {
      const entries = fs.readdirSync(pnpmPath)
      const electronEntry = entries.find((entry) => entry.startsWith('electron@'))
      if (electronEntry) {
        const electronPkgPath = path.join(pnpmPath, electronEntry, 'node_modules', 'electron')
        const installPath = path.join(electronPkgPath, 'install.js')
        if (fs.existsSync(installPath)) {
          return installPath
        }
      }
    }
  } catch {
    // Ignore errors
  }

  return null
}

function checkElectronBinary() {
  const rootPath = path.resolve(__dirname, '../../../..')
  const nodeModulesPath = path.join(rootPath, 'node_modules')

  // Try to find in .pnpm
  try {
    const pnpmPath = path.join(nodeModulesPath, '.pnpm')
    if (fs.existsSync(pnpmPath)) {
      const entries = fs.readdirSync(pnpmPath)
      const electronEntry = entries.find((entry) => entry.startsWith('electron@'))
      if (electronEntry) {
        const electronPkgPath = path.join(
          pnpmPath,
          electronEntry,
          'node_modules',
          'electron',
          'dist',
        )
        const exePath = path.join(
          electronPkgPath,
          process.platform === 'win32' ? 'electron.exe' : 'electron',
        )
        if (fs.existsSync(exePath)) {
          return true
        }
      }
    }
  } catch {
    // Ignore errors
  }

  return false
}

// Check if binary already exists
if (checkElectronBinary()) {
  console.log('Electron binary already installed')
  process.exit(0)
}

// Find and run install script
const installPath = findElectronInstallScript()
if (installPath) {
  console.log('Installing Electron binary...')
  try {
    require(installPath)
    console.log('Electron binary installed successfully')
  } catch (error) {
    console.error('Failed to install Electron binary:', error.message)
    process.exit(1)
  }
} else {
  console.warn('Could not find Electron install script.')
  console.warn('Electron binary may not be installed. You may need to install it manually.')
  // Don't fail, as this might be OK in some cases
}
