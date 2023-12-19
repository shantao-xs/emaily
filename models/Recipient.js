/**储存子文档：挂靠在survey里
每个recipient都需要填写两个数据：邮件地址，是否已提交
*/

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

//画一个模板schema：设定每个collection中的各种属性及其data type
const recipientSchema = new Schema({
    email:String,
    responded:{type:Boolean,default:false}
});

//导出子文档model，让survey接收它
module.export=recipientSchema;