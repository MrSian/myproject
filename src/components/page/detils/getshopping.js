import React,{Component} from 'react';
// fontawesome 图标库
import { library } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon} from '@fortawesome/react-fontawesome'  //组件
import {faHome, faShoppingCart,faUser} from '@fortawesome/free-solid-svg-icons'  //图标

library.add(faHome, faShoppingCart,faUser)
class  getshopping extends Component{
    // 添加到购物车
    handlerAddToCart(goods){
        let has = this.props.cartlist.filter(item=>{
            return item.proId == goods.proId
        });
        if(has.length){
            // 存在
            this.props.changeQty(goods.proId,++goods.qty);
        }else{
            goods.qty = 1;
            this.props.addToCart(goods);
        }
       
    }
    componentWillMount(){
        console.log(this)
    }
    render(){
    return <div className="getshopping" style={{position: 'fixed', bottom: '0px'}}>
        <footer  className="item-footer" >
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