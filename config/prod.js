/**储存prod环境下的keys - 禁止明文写在文件里，commit它
 * 注意：为了上线的product的安全，这里不应该手动存入keys，而应该通过环境变量process.env来调用
 * 
 * 为在render服务器端创建环境变量，需要在render上操作：同时在environment中加入变量CI
*/

module.exports={
    googleClientID:process.env.GOOGLE_CLIENT_ID,
    googleClientSecret:process.env.GOOGLE_CLIENT_SECRET,
    mongoURI:process.env.MONGO_RUI,
    cookieKey:process.env.COOKIE_KEY
};
