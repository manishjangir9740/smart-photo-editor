import { createServer } from 'http'
import { createReadStream } from 'fs'
import { join, dirname } from 'path'
import { fileURLToPath } from 'url'

const __dirname = dirname(fileURLToPath(import.meta.url))
const PORT = process.env.PORT || 3000

const server = createServer((req, res) => {
  let filePath = join(__dirname, 'dist', req.url === '/' ? 'index.html' : req.url)
  
  // Handle SPA routing
  if (!filePath.includes('.')) {
    filePath = join(__dirname, 'dist', 'index.html')
  }

  const contentTypeMap = {
    '.html': 'text/html',
    '.js': 'text/javascript',
    '.css': 'text/css',
    '.json': 'application/json',
    '.png': 'image/png',
    '.jpg': 'image/jpg',
    '.gif': 'image/gif',
    '.svg': 'image/svg+xml',
    '.ico': 'image/x-icon',
  }

  const extname = String(filePath.split('.').pop())
  const contentType = contentTypeMap['.' + extname] || 'application/octet-stream'

  createReadStream(filePath)
    .on('error', () => {
      // If the file doesn't exist, serve index.html for SPA routing
      createReadStream(join(__dirname, 'dist', 'index.html'))
        .on('error', () => {
          res.writeHead(500)
          res.end('Error loading index.html')
        })
        .pipe(res)
    })
    .on('open', () => {
      res.writeHead(200, { 'Content-Type': contentType })
    })
    .pipe(res)
})

server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`)
}) 