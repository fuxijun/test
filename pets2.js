const http = require('http')
const url = require('url')
const querystring = require('querystring')

const pets = [
  { type: 'dog', dto: { list: [{ kind: 'hsq', name: 'erha', sex: 'male' }, { kind: 'chaiquan', name: 'chaichai', sex: 'female' }] } },
  { type: 'cat', dto: { list: [{ kind: 'buou', name: 'bubu', sex: 'male' }, { kind: 'duanmiao', name: 'duanduancat', sex: 'female' }] } },
  { type: 'rabbit', dto: { list: [{ kind: 'changmao', name: 'maomao', sex: 'male' }, { kind: 'duanmiaotu', name: 'duanduantu', sex: 'female' }] } },
]

const server = http.createServer((request, response) => {
  const requestUrl = url.parse(request.url)
  const query = querystring.parse(requestUrl.query)
  if (requestUrl.pathname === '/pets' && request.method === 'GET') {
    const type = query.type
    const pet = pets.find(val => val.type === type)
    if (pet) {
      response.writeHead(200, { 'Content-Type': 'application/json' })
      response.end(JSON.stringify(pet))
    } else {
      response.writeHead(404, { 'Content-Type': 'text/plain' })
      response.end('Pet Not Found')
    }
  } else {
    response.writeHead(404, { 'Content-Type': 'text/plain' })
    response.end('Pet Not Found')
  }
});

const Port = 8003
server.listen(Port, () => {
  console.log(`Server running at http://localhost:${Port}/`)
})
