// Delete all node_modules directories
const fs = require('fs')
const path = require('path')
const { execSync } = require('child_process')

const rootPath = path.resolve(__dirname, '..')

// Find all node_modules directories
function findNodeModules(dir, nodeModulesDirs = []) {
  const entries = fs.readdirSync(dir, { withFileTypes: true })
  
  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name)
    
    if (entry.isDirectory()) {
      if (entry.name === 'node_modules') {
        nodeModulesDirs.push(fullPath)
      } else if (entry.name !== '.git' && entry.name !== '.turbo' && !entry.name.startsWith('.')) {
        try {
          findNodeModules(fullPath, nodeModulesDirs)
        } catch (error) {
          // Ignore permission errors
        }
      }
    }
  }
  
  return nodeModulesDirs
}

console.log('Finding all node_modules directories...')
const nodeModulesDirs = findNodeModules(rootPath)

console.log(`Found ${nodeModulesDirs.length} node_modules directories`)
nodeModulesDirs.forEach((dir) => {
  const relativePath = path.relative(rootPath, dir)
  console.log(`  - ${relativePath}`)
})

// Remove all node_modules
console.log('\nRemoving all node_modules...')
nodeModulesDirs.forEach((dir) => {
  const relativePath = path.relative(rootPath, dir)
  if (fs.existsSync(dir)) {
    console.log(`Removing ${relativePath}...`)
    fs.rmSync(dir, { recursive: true, force: true })
    console.log(`Removed ${relativePath}`)
  }
})

// Remove .turbo cache
const turboPath = path.join(rootPath, '.turbo')
if (fs.existsSync(turboPath)) {
  console.log('Removing .turbo cache...')
  fs.rmSync(turboPath, { recursive: true, force: true })
  console.log('Removed .turbo')
}

console.log('\nAll node_modules and caches removed!')
console.log('Run "pnpm install" to reinstall dependencies.')

