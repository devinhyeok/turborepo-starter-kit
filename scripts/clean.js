// Clean root node_modules and .turbo directories
const fs = require('fs')
const path = require('path')

const rootPath = path.resolve(__dirname, '..')
const dirsToRemove = ['node_modules', '.turbo']

dirsToRemove.forEach((dir) => {
  const dirPath = path.join(rootPath, dir)
  if (fs.existsSync(dirPath)) {
    console.log(`Removing ${dir}...`)
    fs.rmSync(dirPath, { recursive: true, force: true })
    console.log(`Removed ${dir}`)
  } else {
    console.log(`${dir} does not exist, skipping`)
  }
})

console.log('Root cleanup completed')

