/**存放auth相关的路由管理器
 * 注意：每增加一个路由，都要在index.js root文件里更新require它
 * 使用passport中间件来简化路由处理器搭建流程
 */
const passport = require('passport');

//将routes打包成一个被export的module，并需输入参数app才可执行：

//passport.authenticate('启动哪个strategy',[获取数据的范围是])
module.exports = app => {
    app.get(
      '/auth/google',
      passport.authenticate('google', {
        scope: ['profile', 'email']
      })
    );
  
    app.get(
      '/auth/google/callback',
      passport.authenticate('google'),
      (req, res) => {
        res.redirect('/surveys');
      }
    );
  
    //登出并跳转回主页
    app.get('/api/logout', (req, res) => {
      req.logout();
      res.redirect('/');
    });
  
    //获取current_user的数据
    app.get('/api/current_user', (req, res) => {
      res.send(req.user);
    });
  };
