// 简单的后端状态检查
import http from 'http';

const options = {
  hostname: 'localhost',
  port: 8080,
  path: '/admin/common/download/resource',
  method: 'GET',
  timeout: 3000
};

console.log('正在检查若依后端服务...');

const req = http.request(options, (res) => {
  console.log('\n✅ 若依后端服务正常运行！');
  console.log(`状态码: ${res.statusCode}`);
  console.log('\n🎯 下一步：刷新浏览器页面，然后运行测试命令');
});

req.on('error', (err) => {
  console.log('\n❌ 若依后端服务未启动');
  console.log('请先启动若依后端项目：');
  console.log('1. 打开若依后端项目');
  console.log('2. 运行 RuoYiApplication.java');
  console.log('3. 确保服务运行在 http://localhost:8080');
});

req.on('timeout', () => {
  console.log('\n⏰ 连接超时，后端可能未启动');
  req.destroy();
});

req.end();
