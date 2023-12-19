/**渲染层 react route相关
 * 主组件：App，导航通往所有的router方向
 * 01.连接react和redux（action）
 * 02.渲染并返回从app到各大url的route
 */

/**route跳转不同组件和exact锁定url
 * 怎么使用route对不同path的url进行定向跳转？————当url为/时，路由导向tbc这个组件
 * 怎么不要让该跳转消失的组件还挂在页面上？————注意react会把所有匹配当前url的组件都放上，比如也会放'/'的组件Landing，所以需要exact完全匹配，如'/'只有完全符合才能够跳转（exact 等价于 exact={true}）
 * 怎么让某个组件一直出现？比如Header组件？————不要用route跳转就可以了，直接放着，同理Footer也是      
 */


/**class component OR function/variable component?
 * 类组件：需要定义render()方法来渲染其中return的内容
 * 函数组件：直接return要渲染的内容
*/


import React, { Component } from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import { connect } from 'react-redux';
import * as actions from '../actions';

import Header from './Header';
import Landing from './Landing';
const Dashboard = () => <h2>Dashboard</h2>;
const SurveyNew = () => <h2>SurveyNew</h2>;

class App extends Component {
  componentDidMount() {
    this.props.fetchUser();
  }

  render() {
    return (
      <div className="container">
        <BrowserRouter>
          <div>
            <Header />
            <Route exact path="/" component={Landing} />
            <Route exact path="/surveys" component={Dashboard} />
            <Route path="/surveys/new" component={SurveyNew} />
          </div>
        </BrowserRouter>
      </div>
    );
  }
}

export default connect(null, actions)(App);