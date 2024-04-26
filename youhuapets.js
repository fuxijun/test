const http = require('http');
const url = require('url');
const querystring = require('querystring');

const pets = [
  { type: 'dog', dto: { list: [{ kind: 'hsq', name: 'erha', sex: 'male' }, { kind: 'chaiquan', name: 'chaichai', sex: 'female' }] } },
  { type: 'cat', dto: { list: [{ kind: 'buou', name: 'bubu', sex: 'male' }, { kind: 'duanmiao', name: 'duanduancat', sex: 'female' }] } },
  { type: 'rabbit', dto: { list: [{ kind: 'changmao', name: 'maomao', sex: 'male' }, { kind: 'duanmiaotu', name: 'duanduantu', sex: 'female' }] } },
];

const server = http.createServer((request, response) => {
  const { pathname, query } = url.parse(request.url, true);

  if (pathname === '/pets' && request.method === 'GET') {
    const { type, name } = query;

    if (!type) {
      return respondWith(response, 400, 'Bad Request: Missing type parameter');
    }

    const pet = pets.find(pet => pet.type === type && (!name || pet.dto.list.some(p => p.name === name)));

    if (pet) {
      respondWith(response, 200, pet);
    } else {
      respondWith(response, 404, 'Pet Not Found');
    }
  } else {
    respondWith(response, 404, 'Not Found');
  }
});

function respondWith(response, statusCode, data) {
  response.writeHead(statusCode, { 'Content-Type': 'application/json' });
  response.end(JSON.stringify(data));
}

const port = 8002;
server.listen(port, () => {
  console.log(`Server running at http://localhost:${port}/`);
});
