/**储存所有mongoose创建的user collections
每个用户有一个对应的collection,每个collsection中储存的record的data type可以不同

具体测试需要把firewall的问题解决
*/

const mongoose = require('mongoose');
const Schema = mongoose.Schema;//创建一个变量，分配mongoose的schema属性。或者用const {Schema}=mongoose;

//画一个模板schema：设定每个collection中的各种属性及其data type
const userSchema = new Schema({
    googleId:String//从哪里获得googleId？在google auth之后，跳转回callback url时会返回一个profile，内含googleId，需要引用它--passport.js
});


mongoose.model('users',userSchema);//使用model执行，新建一个user collction