/**route file :index.js
 * 在server端：创建express app */

const express = require('express'); //get express from library
const app=express(); //app是一个express func

//app.get:创建一个路由处理器，传递http request 'get'给server，要求当访问'localhost:5000'+'/'（主页）时，执行res.send
//其他express的method：get,post,put,delete,patch
app.get('/', (req, res) => { 
    res.send({bye:'ooo'}); //发送一个包含json文件{}的response
});

//express告诉node监听哪个端口（本地端口，或用render部署应用程序分配的端口）
//执行：1.运行node index.js   2.打开http://localhost:5000/即可查看
const PORT =process.env.PORT || 5000; //查看底层环境，获取动态端口，render会分配端口给它。如果是开发环境，则使用localhost:5000
app.listen(PORT); 

/**部署应用程序
 * 1.动态端口绑定：render上监听端口
 * 2.明确node environment：检查npm和node的version(node/npm -v)，然后写入package.json
 * 3.明确怎么启动应用程序：执行一个start脚本：package.json-scripts-start
 * 4.创建 .gitignore文件：写入要忽略的内容，如node_modules。确保部署应用的时候不commit所有自动下载的不要用的dependency
 * 5.在render部署web service：https://www.udemy.com/course/node-with-react-fullstack-web-development/learn/lecture/39244222#questions/18540614
 * 注意：每次commit push到git repository后，render都会重新构建和部署
 * 
 * 再部署：
 * 1.git status 检查更改的文件
 * 2.git add . 添加更改的文件
 * 2.git commit -m "changed greeting"
 * 3.git push
 */