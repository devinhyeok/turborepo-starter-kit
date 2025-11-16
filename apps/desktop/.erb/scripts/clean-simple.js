// Clean build artifacts using Node.js built-in functions
const fs = require('fs')
const path = require('path')

const rootPath = path.resolve(__dirname, '../..')
const releasePath = path.join(rootPath, 'release')
const distPath = path.join(releasePath, 'app', 'dist')
const buildPath = path.join(releasePath, 'build')
const dllPath = path.join(rootPath, '.erb', 'dll')
const turboPath = path.join(rootPath, '.turbo')

const foldersToRemove = [distPath, buildPath, dllPath, turboPath]

foldersToRemove.forEach((folder) => {
  if (fs.existsSync(folder)) {
    console.log(`Removing ${path.relative(rootPath, folder)}...`)
    fs.rmSync(folder, { recursive: true, force: true })
    console.log(`Removed ${path.relative(rootPath, folder)}`)
  }
})

console.log('Clean completed')

