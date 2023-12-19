/**储存survey model
每个用户可以储存若干个survey
*/

const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const recipientSchema = require('./Recipient');

//画一个模板schema：设定每个collection中的各种属性及其data type
const surveySchema = new Schema({
    title:String,
    subject:String,
    body:String,
    //注意收件人是一串，所以是字符串数组
    recipients:[recipientSchema], 
    //提交回答的计数器：
    yes:{type:Number,default:0},
    no:{type:Number,default:0},
    //跟user model相连
    _user:{type:Schema.Types.ObjectId,ref:'User'},
    //记录日期
    dateSent:Date,
    latestResponded:Date

});


mongoose.model('surveys',surveySchema);//最后用.model()执行，新建一个survey collction