let http = require('http')
let fs = require('fs')

let port = 3000
let filePath = './database/fields.json'
let pagePath = './index.html'
let jsPath = './assets/index.js'
let cssPath = './assets/index.css'

let server = http.createServer().listen(port)

server.on('request', function (req, res) {
  if (req.method == 'POST') {

    if (req.url == '/post') {
      res.writeHead(200, { 'Content-Type': 'text/html' })
      res.end('Submited!', 'utf-8')
    }

    fs.readFile(filePath, function (error, content) {
      if (error) {
        res.writeHead(500)
        res.end('Desculpe! Ocorreu um erro: ' + error.code + ' ..\n')
        console.log('Desculpe! Ocorreu um erro: ' + error.code + ' ..\n')
        res.end()
      } else {
        res.writeHead(200, { 'Content-Type': 'application/json' })
        res.end(content, 'utf-8')
      }
    })
  } else {
    switch (req.url) {
      case '/':
        fs.readFile(pagePath, function (err, data) {
          res.writeHead(200, {'Content-Type': 'text/html'})
          res.end(data)
        })
        break
      case '/assets/index.js':
        fs.readFile(jsPath, function (err, data) {
          res.writeHead(200, {'Content-Type': 'text/javascript'})
          res.end(data)
        })
        break
      case '/assets/index.css':
        fs.readFile(cssPath, function (err, data) {
          res.writeHead(200, {'Content-Type': 'text/css'})
          res.end(data)
        })
        break
      default:
        res.writeHead(404, {'Content-Type': 'text/html'})
        res.end('404!')
        break
    }
  }
})
module.exports = server
console.log('Listening on port 3000')
