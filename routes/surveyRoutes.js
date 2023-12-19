/**存放survey相关的路由管理器
 * 使用中间件来简化路由处理器搭建流程
 */
const requireLogin =require('../middlewares/requireLogin');
const requireCredits=require('../middlewares/requireCredits');
const Mailer = require('../services/Mailer');
const surveyTemplate = require('../services/emailTemplates/surveyTemplate');

//如果在多个文件调用mongoose model会报警，所以这里单独建一个创建Survey model的方法
const mongoose = require('mongoose');
const SurveyCreator = mongoose.model('surveys');




/**和db交互，需要异步 */
module.exports=(app)=>{
    //查看survey相关的route
    app.get('/api/surveys/thanks',(req,res)=>{
        res.send('Thanks for voting');
    });

    // create survey的route
    //前置条件：1.已登录 2.有积分可以创建survey 
    app.post('/api/surveys', requireLogin,requireCredits,async (req,res)=>{ 
        const {title,subject,body,recipients} = req.body();//这个body哪里来的？

        //创建一个survey model的实例object
        const survey = SurveyCreator({
            title,
            subject,
            body,
            //注意，当用户传入邮箱地址时，是用','或' '隔开的，要把它转换为子文档集合的格式，要split一下，然后把每个邮件地址map成一个对象，合起来构成一个字符串组
            recipients:recipients.split(',').map(email=> {
                return {email:email.trim()} //email属性：email具体值
            }),
            _user:req.user.id, //user model被passport进行用户认证的时候会自动创建唯一id这个属性，可以在这里直接调用
            dateSent:Date.now()
        });

        //发送email并确认发送成功
        //通过Mailer整理survey object中的数据：第一个是survey(title,subject等)，第二个是被图表样式化了的survey.body正文
        const mailer = new Mailer(survey, surveyTemplate(survey));
        
        try{
            await mailer.send(); //调用在Mailer service中定义的send方法来send mailer

            //保存survey到db并调整用户的credit并存到db
            await survey.save();
            req.user.credits-=1;
            const user = await req.user.save();
            res.send(user); //为什么这里要分三步？
        }catch(err){
            res.status(422).send(err);
        }
    });


}

