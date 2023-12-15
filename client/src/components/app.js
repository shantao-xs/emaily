/**渲染层 react route相关
 * 主组件：App，导航通往所有的router方向
 * 01.连接react和redux（action）
 * 02.渲染并返回从app到各大url的route
 */
import {BrowserRouter, Route} from 'react-router-dom';
import React from 'react';
import { Component } from 'react'; //从此可以通过继承componnet类来创建react componnet


/**route跳转不同组件和exact锁定url
 * 怎么使用route对不同path的url进行定向跳转？————当url为/时，路由导向tbc这个组件
 * 怎么不要让该跳转消失的组件还挂在页面上？————注意react会把所有匹配当前url的组件都放上，比如也会放'/'的组件Landing，所以需要exact完全匹配，如'/'只有完全符合才能够跳转（exact 等价于 exact={true}）
 * 怎么让某个组件一直出现？比如Header组件？————不要用route跳转就可以了，直接放着，同理Footer也是      
 */
import Header from './Header';
import Landing from './Landing';
import SurveyNew from './SurveyNew';
import Dashboard from './Dashboard';

/**class component OR function/variable component?
 * 类组件：需要定义render()方法来渲染其中return的内容
 * 函数组件：直接return要渲染的内容
*/
import {connect} from 'react-redux'; //连接react和redux的工具库
import * as actions from '../actions'; //调用所有的redux action
class App extends Component{
    //连接react和redux：接收redux action creator到react-- fetch_user //逻辑：只有页面渲染的时候，才执行这个函数，去调用fetch_user
    componentDidMount(){
        this.props.fetchUser(); //执行fetchUser action
    };


//这里为什么要写className='container'？为什么container能够预设页面大小？我在哪里调整？
    render(){
        return(
            <div className='container'> 
                <BrowserRouter>
                    <div>
                        <Header />
                        <Route exact path='/' component={Landing} /> 
                        <Route exact path='/surveys' component={Dashboard} /> 
                        <Route path='/surveys/new' component={SurveyNew} /> 
                    </div>
                </BrowserRouter>
            </div>
        );
    }
};

export default connect(null,actions)(App); //再这里连接redux action和react app两个参数（并没有执行什么）。先输入参数actions和app，然后再执行app这个类组件下面的所有东西





/*fontend doc:
    组件的导入、构建和输出：
        导入：import componentA from 'path'
        构建：const componentA = () => {xxxx;    return ...}
        输出：export default componentA
    命名（文件和方法）：
        文件：全小写，-，_
        方法：驼峰式
 */