/**存放auth相关的路由管理器
 * 注意：每增加一个路由，都要在index.js root文件里更新require它
 * 使用passport中间件来简化路由处理器搭建流程
 */
const passport = require('passport');

//将routes打包成一个被export的module，并需输入参数app才可执行：


// 这个是处理根目录的路由
module.exports=(app)=>{
    app.get('/', (req, res) => {
        res.send('Hello, World!'); 
      });


    //谷歌认证登录路由处理器：向谷歌申请获取以下数据
    app.get('/auth/google', //当用户访问该url，就激活下文进入OAuth流程：
        passport.authenticate('google',{ //此处用'google'来辨识连接passport中的google strategy
            scope:['profile','email']  //并从google中get用户的profile,email,etc.
        })
    );
    /**错误：Cannot GET /auth/google/callback */

    //谷歌认证登录路由处理器：谷歌处理完回调到本网站
    app.get('/auth/google/callback', 
        passport.authenticate('google'),/**中间件：验证google返回的用户信息，添加入req.user中*/
        (req,res)=>{
            res.redirect('/surveys');
        }
    ); 

    //当用户在登录状态时：
    app.get('/api/current_user',(req,res)=>{ //route受到get req时，其中包含了这个特定url，就会执行操作，把req.user发给服务器端作为response
        res.send(req.user);
    });

    //用户注销：1.清空cookie 2.跳转回主页
    //怎么清空cookie？req.logout
    app.get('/api/logout',(req,res)=>{
        req.logout();
        res.redirect('/'); 
    });

}
