// Clean build artifacts
import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const dirsToRemove = ['.next', '.turbo']

dirsToRemove.forEach((dir) => {
  const dirPath = path.join(__dirname, '..', dir)
  if (fs.existsSync(dirPath)) {
    console.log(`Removing ${dir}...`)
    fs.rmSync(dirPath, { recursive: true, force: true })
    console.log(`Removed ${dir}`)
  }
})

console.log('Clean completed')
