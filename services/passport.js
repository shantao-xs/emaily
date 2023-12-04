/**存放所有跟services-passport的配置相关的代码 */
const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy; //导入passport和谷歌的strategy
const keys=require('../config/keys.js');//导入keys文件以引用googleClientID & Secret。注意这里需要返回上级文件夹去找config
const mongoose = require('mongoose');

const User = mongoose.model('users'); //引用users.js中用mongoose创建的新model



//创建一个googlestrategy的新实例，让passport可以处理这个特定的auth供应商
//注册OAuth API，为googlestrategy提供oauth client id&密码（注意用module.export + gitignore避免密码也被push）
passport.use(new GoogleStrategy({
    clientID: keys.googleClientID,
    clientSecret:keys.googleClientSecret,
    callbackURL:'/auth/google/callback',  //注意，由于render proxy不被信任，故会跳转到http而非https并报错，所以要手动设置信任render proxy
    proxy:true
    //回调url：当用户授权google账户后应跳转回此url
    //注意:需再次向google验证本人身份，才能被允许获得用户的资讯并让用户redirect to原址-->怎么做：在google cloud-credentials中，在Authorized redirect URIs填入该target url，方可被google放行
    },
    (accessToken,refreshToken,profile,done)=>{//回调函数具体执行：返回访问令牌、刷新令牌（访问令牌过期后可以自动更新）和google profile（含有unique google id)
        //注意：passport的startegy规定了每个参数的顺序，所以不要把顺序搞混：accessToken, refreshToken, profile,action
        /**查找User DB中是否有记录
         * 异步处理：在与DB交互时使用I/O操作，来提高程序执行响应能力 
         */
        User.findOne({googleId: profile.id})
            .then((existingUser)=>{
                if(existingUser){
                    //若在User DB中能找到对应用户id
                    done(null,existingUser); //使用done函数终止
                }else{
                    //创建新用户new instance
                    new User({googleId: profile.id}).save()
                        .then(user=>done(null,user)); //在js层面给：返回一个新的user collection，并为它的googleId属性赋值：profile中的id-->在DB层面：要把这个数据传入 mongoDB 通过.save()
                        //然后用done终止
                }
        });


        
//当DB为每个user生成唯一id后（即mongoose.model中每个user(collection)的属性user.id -> 将这串id通过serializeUser方法序列化为user专属的标识符token/cookie（此时token=user.id）
passport.serializeUser((user,done)=>{
    done(null,user.id);
    //serializeUser的参数就是done函数返回的user.id。传入一个user model function，提取user.id序列化
    //注意：这里没有用google id而是mongoDB分配给每个user的唯一id，因为注册登录的渠道不止google一个，google id在这里不再唯一，所以需要使用DB提供的唯一id
});

//当user把token传给服务器后 -> 将这串token通过deserializeUser转换为用户信息（如user name），然后去DB找到对应的user collection 
//注意和DB交互时是I/O操作
passport.deserializeUser((id,done)=>{ /**但是这个id从哪里来？passport.serializeUser并没有给id赋值啊 */
    User.findById(id).
        then(user=>{
            done(null,user); //这个user就是user model
        })
});


        /**关于done：done(error,user)
         * done(null, user) 表示认证成功，将用户对象传递给后续的处理流程。
         * done(null, false) 表示认证失败，但没有发生错误，后续的处理流程将意识到认证失败。
         * done(err) 表示认证过程中发生了错误，err 包含了错误的信息，后续的处理流程将意识到发生了错误。
         */
        
        
    })

    //InternalOAuthError: Failed to obtain access token：使用proxy的问题。待解决
);  