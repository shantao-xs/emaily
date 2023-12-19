/**这里是付账有关的路由 
 * 注意：每增加一个路由，都要在index.js root文件里更新require它
 * 使用stripe第三方服务进行支付，并通过stripe包来和第三方平添的stripe API进行通信
*/
const key =require('../config/keys');
const stripe = require('stripe')(key.stripeSecretKey);
const requireLogin =require('../middlewares/requireLogin');

//stripe路由：action creator运作流程：stripe接收一个token，返回一个数据，我们拿着这个数据确认用户已经付钱并且改变redux state
module.exports=(app)=>{
    //注意和stripe和DB的交互都是异步的
    //用requireLogin确保用户只有登录了才能充值
    app.post('/api/stripe', requireLogin,async (req,res)=>{
        const charge = await stripe.charges.create({
            amount: 500,
            currency: 'usd',
            description: 'recharge for your account',
            source:req.body.id
        });
        //把这个充值记录更新到DB，联动./models/Users
        req.user.credits+=5;//执行+5
        const user = await req.user.save();//储存到DB（异步）
    });
};
