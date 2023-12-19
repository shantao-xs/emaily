//引入sendgrid组件和sendgrid api密钥
const keys = require('../config/keys');
const sendgrid = require('sendgrid');
const helper = sendgrid.mail;

class Mailer extends helper.Mail{/**Mail类和 sendgrid.mail method有什么区别 */
    //构造初始化，每new一个都会构造一个，第一个是survey信息(subject,recipients)，第二个参数是邮件正文
    //recipients通过formatAddresses方法处理成字符串
    constructor({subject,recipients},content){
        super();

        this.sgApi = sendgrid(keys.sendGridKey);

        //.Email()创建一个Email类的实例
        this.from_email = new helper.Email('REPLACE_WITH_YOUR_AUTHORIZED_SENDER'); //这里改成Sender的邮件地址，首先需要为Sender生成API key
        this.subject = subject;
        this.recipients=this.formatAddresses(recipients);
        this.body = new helper.Content('text/html',content);

        this.addContent(this.body); /**.addContent是Mail类的方法，不需要额外定义 */
        this.addClickTracking();//增加每个链接的追踪
        this.addRecipients();//增加收件人
    }

    //遍历所有收件人并提取每个人的电子邮件，返回一个helper.Email类的实例的数组
    //因为sendgrid期望接收的数据类型是helper.Email()格式的，所以这里许哟啊转化一下
    formatAddresses(recipients){
        return recipients.map(({email})=>{
            return new helper.Email(email);
        })
    }

    addRecipients() {
        const personalize = new helper.Personalization();
    
        this.recipients.forEach((recipient) => {
          personalize.addTo(recipient);
        });
        this.addPersonalization(personalize);
      }
    

    addClickTracking(){
        const trackingSettings = new helper.TrackingSettings();
        const clickTracking = new helper.ClickTracking(true,true);

        trackingSettings.setClickTracking(clickTracking);
        this.addTrackingSettings(trackingSettings);
    }

    async send(){
        const request = this.sgApi.emptyRequest({
            method:'POST',
            path:'/v3/mail/send', //path的路径是sendgrid的要求
            body:this.toJSON() //使用这个方法把数据转换为json格式来传给sendgrid
        });

        const response = await this.sgApi.API(request);
        return response;
    }
}

module.exports=Mailer; //导出Mailer到surveyRoute


