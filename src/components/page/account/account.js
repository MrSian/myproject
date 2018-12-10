import React ,{Component} from 'react';
class Account extends Component{
    constructor(){
        super();
        this.state={
            pageuser:['登录','注册'],
            accountlist:['待支付','待发货','待收货','带评论','回复','退换货','我的订单'],
            accountmanny:['我的优惠券','现金积分','关于发票'],
            accountinformation:['密码和登录信息','老会员建议','客户服务','地址管理','手机验证','']
        }
    }
    render(){
        return <div className="account">
        <div id="topbar" className="header" >
                <div  className="header-content">  
                    <p  className="header-title">账户中心</p>  
                </div>
            </div>
            <div>
                <div className="accountuser">
                <div className="accountpass">
                    <h3>你还未登录</h3>
                    <p className="caccountp"><span><a href="#/login">登录</a></span>|<span>注册</span></p>
                </div>
                </div>
                <div className="accountone">
                    <ul>
                        {this.state.accountlist.map((list,idx)=>(
                            <li key={idx}><span>{list}</span></li>
                        ))}
                    </ul>
                </div>
                <div className="accounttwo">
                    <ul>
                        {this.state.accountmanny.map((list,idx)=>(
                            <li key={idx}><span>{list}</span></li>
                        ))}
                    </ul>
                </div>
                <div className="accounttwo">
                    <ul>
                        {this.state.accountinformation.map((list,idx)=>(
                            <li key={idx}><span>{list}</span></li>
                        ))}
                    </ul>
                </div>
            </div>
        </div>
    }
}
export {Account};