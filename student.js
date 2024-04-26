const http = require('http');
const url = require('url');
const querystring = require('querystring');

// 学生信息数组
let students = [
  { name: 'Alice', age: 20, sex: 'female', height: 165, score: 90 },
  { name: 'Bob', age: 21, sex: 'male', height: 175, score: 85 },
  { name: 'Charlie', age: 22, sex: 'male', height: 180, score: 95 }
];

// 创建 HTTP 服务器
const server = http.createServer((req, res) => {
  const reqUrl = url.parse(req.url);
  const query = querystring.parse(reqUrl.query);

  // 检查请求路径
  if (reqUrl.pathname === '/student' && req.method === 'GET') {
    // 获取查询参数
    const name = query.name;

    // 查找学生信息
    const student = students.find(student => student.name === name);

    // 返回查询结果
    if (student) {
      res.writeHead(200, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify(student));
    } else {
      res.writeHead(404, { 'Content-Type': 'text/plain' });
      res.end('Student not found');
    }
  } else {
    res.writeHead(404, { 'Content-Type': 'text/plain' });
    res.end('Not found');
  }
});

// 监听端口
const PORT = 8001;
server.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}/`);
});
