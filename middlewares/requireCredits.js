/**所有需要先判定用户登录的条件，组成一个通用中间件 */

module.exports = (req,res,next) =>{ //用哪个状态码？查看文档
    if(req.user.credits<1){
        return res.status(403).send({error:'Your credits are insufficient!'});
    }

    next();//next指下一个中间件
}