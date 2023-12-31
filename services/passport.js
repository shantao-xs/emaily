/**存放所有跟services-passport的配置相关的代码
 * passport会自动创建一个唯一标识符id，不需要显式创建id这个属性
 */
const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy; //导入passport和谷歌的strategy
const keys=require('../config/keys.js');//导入keys文件以引用googleClientID & Secret。注意这里需要返回上级文件夹去找config

//引用users.js中用mongoose创建的user model
const mongoose = require('mongoose');
const User = mongoose.model('users'); 

const HttpsProxyAgent = require('https-proxy-agent');


//创建一个googlestrategy的新实例，让passport可以处理这个特定的auth供应商
//注册OAuth API，为googlestrategy提供oauth client id&密码（注意用module.export + gitignore避免密码也被push）
//结构：passport.use(strategy_here,action_here)
passport.use(new GoogleStrategy({
    clientID: keys.googleClientID,
    clientSecret:keys.googleClientSecret,
    callbackURL:'/auth/google/callback',  //注意，由于render proxy不被信任，故会跳转到http而非https并报错，所以要手动设置信任render proxy
    proxy:true
    //回调url：当用户授权google账户后应跳转回此url
    },

    /**查找User DB中是否有记录
     * 异步处理：在与DB交互时使用I/O操作，来提高程序执行响应能力 
     */

    //async法：
    async (accessToken, refreshToken,profile,done)=>{
        //查找User DB中是否有记录，凭据：有没有googleID
        const existingUser = await User.findOne({googleId: profile.id});
        if(existingUser){
            //若在User DB中能找到对应用户id，传出existingUser
            done(null,existingUser);
        }else{
            //若找不到，创建新用户的model，传出该新用户newUser
            const newUser = await User({googleId: profile.id}).save();//.save(): mongoDB的method
            done(null,newUser);
        }
    }));



//当DB为每个user生成唯一id后（即mongoose.model中每个user(collection)的属性user.id -> 将这串id通过serializeUser方法序列化为user专属的标识符token/cookie（此时token=user.id）
passport.serializeUser((user,done)=>{
    done(null,user.id);
    //serializeUser的参数就是done函数返回的user.id。传入一个user model function，提取user.id序列化
    //注意：这里没有用google id而是mongoDB分配给每个user的唯一id，因为注册登录的渠道不止google一个，google id在这里不再唯一，所以需要使用DB提供的唯一id
});

//当user把token传给服务器后 -> 将这串token通过deserializeUser转换为用户信息（如user name），然后去DB找到对应的user collection 

     passport.deserializeUser(
        async (id,done)=>{
            const user = await User.findById(id);
            done(null,user);//这个user就是user model
     });


/* backend method doc:
    done(error,user): [passport method]
        - done(null, user) 表示认证成功，将用户对象传递给后续的处理流程。
        - done(null, false) 表示认证失败，但没有发生错误，后续的处理流程将意识到认证失败。
        - done(err) 表示认证过程中发生了错误，err 包含了错误的信息，后续的处理流程将意识到发生了错误。

    xx method: [? method]
 */
        
        


    //InternalOAuthError: Failed to obtain access token：使用proxy的问题。待解决
