// Clean build artifacts
const fs = require('fs')
const path = require('path')

const dirsToRemove = ['.expo', '.turbo', 'dist', '.next']

dirsToRemove.forEach((dir) => {
  const dirPath = path.join(__dirname, '..', dir)
  if (fs.existsSync(dirPath)) {
    console.log(`Removing ${dir}...`)
    fs.rmSync(dirPath, { recursive: true, force: true })
    console.log(`Removed ${dir}`)
  }
})

console.log('Clean completed')

