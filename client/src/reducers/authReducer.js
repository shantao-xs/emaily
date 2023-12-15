/**reducer-auth reducer 管理用户登录状态 */
import { FETCH_USER } from "../actions/types";

export default function(state=null,action){//默认（强制购买）的商品：state:{}
    console.log(action); //记录这个reducer的操作以便查看
    switch(action.type){//reducer清单上有不同的购买计划
        default://默认的state，包括正在查询user是否登录的这段时间，直接返回null
            return state;
        case FETCH_USER: //如果是跟获取用户数据有关的action类型（比如用户登录信息，用户支付账户信息等）
            return action.payload || false; //返回user model：如果user model中没有值（即用户没登陆），则返回false


    }
}