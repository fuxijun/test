const http = require('http');

const server = http.createServer((req, res) => {
  res.writeHead(200, {
    'Content-Type': 'text/plain',
    'X-Custom-Header': 'CustomValue'
  });

  res.end('Hello, World!\n');
});

server.listen(8001, () => {
  console.log('Server running at http://localhost:8001/');
});
