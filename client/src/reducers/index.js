/**reducer-root 统一输出所有的reducer
 * 
 * Q&A
 * 怎么收集各种reducer？ --如导入authoReducer并纳入export的打包里
 * 怎么整合这些reducer？ --combineReducers
 * 怎么进行输出？ --export default ...
 */
import { combineReducers } from "redux";
import authReducer from "./authReducer";

//state包含以下属性：auth（由authReducer传递）
export default combineReducers({
    auth:authReducer
});