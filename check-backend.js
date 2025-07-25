// 检查若依后端服务状态
const http = require('http');

function checkBackendStatus() {
  const options = {
    hostname: 'localhost',
    port: 8080,
    path: '/admin/common/download/resource',
    method: 'GET',
    timeout: 5000
  };

  console.log('正在检查若依后端服务状态...');
  
  const req = http.request(options, (res) => {
    console.log(`✅ 若依后端服务运行正常！`);
    console.log(`状态码: ${res.statusCode}`);
    console.log(`响应头:`, res.headers);
    
    console.log('\n📝 下一步操作建议:');
    console.log('1. 启动前端服务: npm run dev');
    console.log('2. 在浏览器控制台运行: window.testBackendConnection()');
    console.log('3. 测试图书管理接口: window.testBookApi()');
    console.log('4. 开始实现龙舟队伍管理接口');
  });

  req.on('error', (err) => {
    console.log('❌ 若依后端服务未运行或无法访问');
    console.log('错误信息:', err.message);
    
    console.log('\n🔧 解决方案:');
    console.log('1. 确保若依后端项目已启动');
    console.log('2. 检查后端是否运行在 http://localhost:8080');
    console.log('3. 检查防火墙设置');
    console.log('4. 查看后端控制台日志');
  });

  req.on('timeout', () => {
    console.log('❌ 连接超时，后端服务可能未响应');
    req.destroy();
  });

  req.end();
}

checkBackendStatus();
