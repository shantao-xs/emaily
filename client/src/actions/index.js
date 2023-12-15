/**action creator-root 统一输出所有的action
 */

import axios from 'axios';
import { FETCH_USER } from './types';

//action creator:fetch user 目的：查看该browser上的用户是否登录
//通过在src的redux配置主文件中创建const store = createStore(reducers,{},applyMiddleware(reduxThunk));使用redux thunk中间件，配合异步axios。返回dispatch function，等到从路由那里等到res之后，由thunk进行dispatch
/**ATTENTION:这个文件要export了才能用！ */
//用axios向后端异步获取，从express-middleware-route->return res. api：连接前端和后端的窗口。

export const fetchUser = () => async dispatch =>{
    const res = await axios.get('/api/current_user');//向指定url发出获取数据的请求

    dispatch({
        type:FETCH_USER,
        payload:res.data //返回user model中的data
        });
};


export const handleToken = (token) => async dispatch =>{
    const res= await axios.post('/api/stripe',token); //向指定url发出token请求，接收其res
    dispatch({
        type:FETCH_USER, //auth reducer接收这个type做出后续判断
        payload:res.data //返回user model中的data
        });

}




/**docs
 * payload: action携带的数据，可以是打包res.data，也可以是限定的某些键值对如payload:{id:productId, name:productName}
 * type：action的类型。自定义，比如这里定义的FETCH_USER
 * 
 * 异步处理：
 * -后端vsDB：promise，async等
 * -前端vs后端：axios，fetch等，常用来发起异步的http requset
 */


