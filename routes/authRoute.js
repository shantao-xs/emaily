/**存放auth相关的路由管理器 */
//引入passport module，借助passport简化路由处理器搭建流程？？？
const passport = require('passport');

//将routes打包成一个被export的module，并需输入参数app才可执行：
module.exports=(app)=>{
    //谷歌认证登录路由处理器：1
    app.get('/auth/google', //当用户访问该url，就激活下文进入OAuth流程：
        passport.authenticate('google',{ //此处用'google'来辨识连接passport中的google strategy
            scope:['profile','email']  //并从google中get用户的profile,email,etc.
        })
    );
    /**错误：Cannot GET /auth/google/callback */

    //谷歌认证登录路由处理器：2
    app.get('/auth/google/callback', passport.authenticate('google')); //获得code

    //api路由：？？？
    //测试通过oauth登录的user是否可以顺利登录
    /**没懂 什么是路由？路由没在index.js中使用啊 */
    app.get('/api/current_user',(req,res)=>{ //route受到get req时，其中包含了这个特定url，就会执行操作，把req.user发给服务器端作为response
        res.send(req.user);
    });

    //用户注销
    app.get('api/logout',(req,res)=>{
        req.logout();//删除用户cookie中的id
        res.send(req.user); //返回空用户的user
    });
}
