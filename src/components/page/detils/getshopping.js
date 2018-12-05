import React,{Component} from 'react';
// fontawesome 图标库
import { library } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon} from '@fortawesome/react-fontawesome'  //组件
import {faHome, faShoppingCart,faUser} from '@fortawesome/free-solid-svg-icons'  //图标

library.add(faHome, faShoppingCart,faUser)
class  getshopping extends Component{
    render(){
    return <div className="getshopping">
        <footer  className="item-footer" style={{position: 'fixed', bottom: '0px'}}>
            <div  className="f-service f-kefu">
            <FontAwesomeIcon icon={faUser}/>
            <br/>
                <span >客服</span>
            </div>  
            <a  href="#/" className="f-service f-home">
            <FontAwesomeIcon icon={faHome}/> <br/><span >首页</span>
            </a> <i className={"fal fa-user-astronaut"}></i>
            <a  target="_self" className="f-service f-cart">
            <FontAwesomeIcon icon={faShoppingCart}/>
                <span  className="cart-num">8</span>
            </a> 
            <button  className="f-btn-add">加入购物车</button> 
        </footer>
    </div>
    }
}
export default getshopping;