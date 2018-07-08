let http = require('http')
let fs = require('fs')

let port = 3000
let filePath = 'fields.json';

let server = http.createServer().listen(port)

server.on('request', function (req, res) {
  if (req.method == 'POST') {
    fs.readFile(filePath, function (error, content) {
      if (error) {
        res.writeHead(500)
        res.end('Desculpe! Ocorreu um erro: ' + error.code + ' ..\n')
        res.end()
      } else {
        res.writeHead(200, { 'Content-Type': 'application/json' })
        res.end(content, 'utf-8')
      }
    })
  } else {
    res.writeHead(404, {})
    res.end('404!', 'utf-8')
  }
})
console.log('Listening on port 3000')