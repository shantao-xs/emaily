/**所有需要先判定用户登录的条件，组成一个通用中间件 */

module.exports = (req,res,next) =>{ 
    if(!req.user){
        return res.status(401).send({error:'you must login first!'});
    }

    next();//next指下一个中间件
}