import React,{Component} from "react";
import {connect} from 'react-redux'; 
import {Link} from 'react-router-dom';
import Payments from './Payments';


function mapStateToProps({auth}){
    return {auth};
}


class Header extends Component{ //使用materializeCss提供的设计代码
    renderContent(){
        switch(this.props.auth){//根据props的auth属性进行分类，类似于在reducer里，利用action type的分类
            case null: //加载中
                return;
            case false: //没登陆
                return <li><a href="/auth/google">Login with Google</a></li>;
            default: //用户已登录
                return [ //为什么这里是一个array？是不是一个index代表一个数据？ //这里可以给li分别加一个key
                    <li key="1"><Payments/></li>,
                    <li key="2" style={{ margin: '0 10px' }}>
                        credits: {this.props.auth.credits} 
                    </li>,
                    <li key="3"><a href="/api/logout">Log out</a></li>
                ];
        }
    }/**注意，上文的this.props.auth.credits中的credits属性是DB文件user model里设置的，由于通过thunk可以让前端访问到后端数据看，所以在props.auth里也可以访问到credits属性 */

    render(){//根据不同的用户登录状态，让点击emaily logo导向不同地址，并让右上角呈现不同的登录选项
        console.log("Auth status:", this.props.auth);
        //如登录，则导向survey，不然导向主页
        return(
            <nav>
                <div className="nav-wrapper">
                    <Link 
                        to={this.props.auth? "/surveys" : "/"} 
                        className="left brand-logo">
                            Emaily
                    </Link>
                    <ul className="right">
                        <Link to="/auth/google">login</Link>
                    </ul>
                    <ul className="right">
                        <li>login test</li>
                    </ul>
                </div>
            </nav>
        );
    }
}


export default connect(mapStateToProps)(Header);
