/**why need proxy? dev environment: create react app的proxy，用来把browser的req传递给后端的Express app 
 * ATTENTION: all proxies 写在这里，不要写在package里
 * 
*/

const { createProxyMiddleware } = require("http-proxy-middleware");
module.exports = function (app) {
  app.use(
    ['/api', '/auth/google'], 
    createProxyMiddleware({
      target: "http://localhost:5000",
    }));
  app.use(
    createProxyMiddleware('/api/*', { target: "http://localhost:5000" }
  ));
};