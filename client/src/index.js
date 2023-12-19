/**前端底层：ES6
 * data层 redux相关 
 * 安装redux相关dependency
*/

import 'materialize-css/dist/css/materialize.min.css'; //如果不是js文件，就需要写出文件类型 //用webpack导入的组件（前面没有./的目录），默认是从npm中导入的

import ReactDOM from "react-dom/client";
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux'; 
import {thunk} from 'redux-thunk';

import App from './components/app';
import reducers from './reducers';


//创建redux store，配置中间件thunk
const store = createStore(reducers,{},applyMiddleware(thunk));

//获取html设计架构里的根元素并渲染之
const el = document.getElementById("root"); 
const root = ReactDOM.createRoot(el);
//通过provider让reduct store里的data可以被提取出来被render
root.render(<Provider store={store}><App/></Provider>);