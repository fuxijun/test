const http = require('http');

const hostname = '127.0.0.1';
const port = 3000;

const server = http.createServer((req, res) => {
  res.statusCode = 200;
  res.setHeader('Content-Type', 'text/plain');
  res.end('Hello, World!\\n');
});
// 防抖函数的原理
// 1.设置一个定时器，在事件触发之前启动计时器
// 2.每当事件被触发时，清除之前的计时器
// 3.重新设置一个新的计时器，等待一定的时间间隔
// 4.如果在时间间隔内再次触发了事件，重复步骤2和3
// 5.在最后一个计时器完成之后，执行事件处理函数
function debounce2(func, dely) {
  let timer
  return function (...args) {
  clearTimeout(timer)

    timer = setTimeout(()=>{
      func.apply(this,args)
    },dely)
  }
}









function debounce(fuc, dely) {
  let timerId
  return function(...args) {
    clearTimeout(timerId)
    timerId = setTimeout( ()=>{
      fuc.apply(this, args)
    },dely)
  }
}

server.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});