import React,{Component} from 'react';
import { Segment, Input, Button } from 'semantic-ui-react'
import {connect} from 'react-redux';
import axios from 'axios';
import image from '../../../image/loginheader.png'
import {cart,tabbar} from '../../../actions';
class  Register extends Component{
    constructor(props){
        super(props);
        this.state={
            regiterlist:['请输入手机号','请设置6-20位密码，包含字母，数字或符号','请输入图形验证码','请输入手机验证码'],
        }
        this.gohistory = this.gohistory.bind(this); 
        // this.onclickdatalodding=this.onclickdatalodding.bind(this); 
    }
    gohistory(){
        let {history,location} = this.props;
        var curren1 = location.pathname;
        var curren2 = window.location.hash.slice(1);
        // if(curren1!=curren2){history.go(-1)}
        history.go(-1)  //回到上一级路由
    }
    handleSubmit=()=>{
        let name=this.name.value;
        let password=this.password.value;
        let tel=this.tel.value;
        console.log(name,password,tel);
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
        return <div className="classregister">
        <div  className="old_user_login">
            <label onClick={this.gohistory}  className="acct_top_back">
            </label> 
            <img  className="acct_top_show" src={image} />
        </div>
        <div  className="bg-wrap">
            <div  className="login_content">
            <h1 >老用户登录</h1> 
            <div  id="wrap">
            <form onSubmit={this.handleSubmit}  id="login-form">
                <ul  className="fm_list">
                {/* {this.state.regiterlist.map((register,idx)=>(
                    <li key={idx} >
                    <input  type="tel" ref={ref=>this.name=ref} maxLength="11" placeholder={register} required="required" className="field_ipt" />
                    {idx==3?<a  className="fidld_skip">获取验证码</a>:''}
                    </li> 
                ))} */}
                    <li >
                        <input  type="text" ref={ref=>this.name=ref} maxLength="11" placeholder="请输入手机号" required="required" className="field_ipt" />
                    </li> 
                    <li >
                        <input  type="password" ref={ref=>this.password=ref} maxLength="11" placeholder="请设置6-20位密码，包含字母，数字或符号" required="required" className="field_ipt" />
                    </li> 
                    <li >
                        <input  type="tel" ref={ref=>this.tel=ref} maxLength="11" placeholder="请输入手机验证码" required="required" className="field_ipt" />
                        <a  className="fidld_skip">获取验证码</a>
                    </li> 
                </ul> 
                <div  id="setting" className="set_link">
                    <a ><b></b><span >阅读并同意 {"《丽芙家居用户协议》"} 和 {"隐私声明"}</span>
                    </a>
                    <input  type="button" defaultValue="登录" className="btn_login" />
                    <input  type="submit"  defaultValue="注册" className="btn_regisiter" />
                </div>
            </form>
        </div> 
                
                </div>
                </div>
                </div>
    }
}
let mapStateToProps=state=>({cartlist:state.cartReducer.goodslist});
let mapDispatchToProps = dispatch=>{
    return {
        changeTabbarStatus(status){
            dispatch(tabbar(status));
        }
    }
}
Register=connect(mapStateToProps,mapDispatchToProps)(Register)
export {Register}