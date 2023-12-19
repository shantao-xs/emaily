/**条件控制：用于判定调用dev还是prod环境下的credentials：注意这个文件不需要加密，不然无法进行条件判断
 * keys汇总不同环境下的密钥（dev，prod）
 * 
 */

if(process.env.NODE_ENV ==='production'){//这个参数来自render友情提供
    //prod环境，返回prod.js
    module.exports=require('./prod'); //也就是module.exports(module.exports)，从prod.js开始导出，这里再导出给别的文件用
}else{
    //dev环境，返回dev.js
    module.exports=require('./dev');
}