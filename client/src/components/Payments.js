/**本组件也要链接redux（action和state）与react */
import React,{Component} from "react";
import StripeCheckout from 'react-stripe-checkout'
import {connect} from 'react-redux'; 
import * as actions from '../actions';

class Payments extends Component{
    //把我们获得的token（通过异步post访问/stripe url返回的token）再次传给stripeCheckout进行二次验证，如果通过了才能够允许用户把账户点数的变化 1.显示在header上 2.存入DB数据库里）
    render(){

        return(
            <StripeCheckout 
                amount={500}
                token={token => this.props.handleToken(token)}
                stripeKey={process.env.REACT_APP_STRIPE_KEY}
                name="Emaily"
                description="recharge for your account"
                />
        );
    };
}


export default connect(null,actions)(Payments);//不需要map到props，直接用action