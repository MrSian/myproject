import React,{Component} from 'react';
import { Segment, Input, Button } from 'semantic-ui-react'
import {connect} from 'react-redux';
import axios from 'axios';
import image from '../../../image/loginheader.png'
import {cart,tabbar} from '../../../actions';
class  Login extends Component{
    constructor(props){
        super(props);
        this.state={

        }
        this.onclickdatalodding=this.onclickdatalodding.bind(this); 
    }
    onclickdatalodding(){

    }
    logindataprev(){
        this.props.changeTabbarStatus(false);
    }
    componentWillMount(){
        this.logindataprev();
    }
    componentWillUnmount() {
        this.props.changeTabbarStatus(true);
    }
    // 这是主页面
    render(){
        return <div className="classlogin">
        <div  className="old_user_login">
            <label  className="acct_top_back">
            </label> 
            <img  className="acct_top_show" src={image} />
        </div>
        <div  className="bg-wrap">
            <div  className="login_content">
            <h1 >老用户登录</h1> 
            <div  id="wrap">
            <form  id="login-form">
                <ul  className="fm_list">
                    <li >
                        <input  type="tel" maxLength="11" placeholder="请输入手机号" required="required" className="field_ipt" />
                    </li> 
                    <li  className="multi">
                        <input  type="password" maxLength="20" placeholder="请输入登录密码" required="required" className="field_ipt" />
                        <a  className="fidld_skip">忘记密码</a>
                    </li>
                </ul> 
                <div  id="setting" className="set_link">
                    <a  href="#/register:;">
                        <span >手机号快捷登录</span> 
                        <b ></b>
                    </a>
                </div>
            </form>
        </div> 
                <input  type="button"  defaultValue="登录" className="btn_login" />
                <input  type="button"  defaultValue="注册" className="btn_regisiter" />
                </div>
                </div>
                </div>
    }
}
let mapStateToProps=state=>({cartlist:state.cartReducer.goodslist});
let mapDispatchToProps = dispatch=>{
    return {
        // 把changeTabbarStatus方法映射到props
        changeTabbarStatus(status){
            dispatch(tabbar(status));
        }
    }
}
// provider  :给下面所有子组件提供store   connect(连接)
// 组件分类：ui组件（职责简单，只负责Ui的呈现，内容只依赖props） 容器组件
// 参数1：自定义映射参数  参数2：
Login=connect(mapStateToProps,mapDispatchToProps)(Login)
export {Login}