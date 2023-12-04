/**root file :index.js
 * 在server端：创建express app
 * 
 * server文件夹中的管理structure：routes,services,config,index 
 * 
 * 其他：module.exporst ⇆ require('./path')*/

const express = require('express'); //导入express库
const mongoose = require('mongoose');//导入mongoose
const keys=require('./config/keys');//导入keys文件——如何加密并使用加密的数据？
const cookieSession = require('cookie-session');//导入cookie-session库，访问cookie
const passport = require('passport');//用passport处理cookie

require('./models/User');//执行user.js；注意它和下面的执行顺序，必须先fetch models，然后拉取passport，因为在总体流程中，有先后执行的顺序
require('./services/passport'); //执行passport.js


//使用mongoose，创建一个address
mongoose.connect(keys.mongoURI);


const app=express(); //产生一个exporess对象



/**中间件middleware
 * 在处理request被传入路由之前中需要用passport进行的预处理：使用cookie，用cookie进行验证
 */
//让express上，使用……
app.use( //cookie，发送给req.session
    cookieSession({ /**用express-session：储存更多的数据 */
        maxAge:30 * 24 * 60 *60 *1000, //浏览器中在自动过期前最多存30天
        keys:[keys.cookieKey]//注意keys要加密，只在keys.js文件中写入
    })
);
//让passport访问cookiesession（req.session），提取cookie进行验证
app.use(passport.initialize());
app.use(passport.session());



/**进入route handler环节 */
require('./routes/authRoute')(app);//连接authRoute.js执行auth路由处理器：导入authRoute中的路由处理器函数，为其添加参数：app




//express告诉node监听哪个端口（本地端口，或用render部署应用程序分配的端口）
//执行：1.运行node index.js   2.打开http://localhost:5000/即可查看
const PORT =process.env.PORT || 5000; //查看底层环境，获取动态端口，render会分配端口给它。如果是开发环境，则使用localhost:5000
app.listen(PORT); 

/**部署应用程序
 * 1.动态端口绑定：render上监听端口
 * 2.明确node environment：检查npm和node的version(node/npm -v)，然后写入package.json
 * 3.明确怎么启动应用程序：执行一个start脚本：package.json-scripts-start
 * 4.创建 .gitignore文件：写入要忽略的内容，如node_modules。确保部署应用的时候不commit所有自动下载的不要用的dependency
 * 5.在render部署web service
 * 注意：每次commit push到git repository后，render都会重新构建和部署
 * 
 * 再部署：
 * 1.git status 检查更改的文件
 * 2.git add . 添加更改的文件
 * 2.git commit -m "changed greeting"
 * 3.git push
 */