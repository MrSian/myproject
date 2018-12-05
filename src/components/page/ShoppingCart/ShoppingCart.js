import React,{Component} from 'react';
import {connect} from 'react-redux';
import {cart as cartAction} from '../../../actions';

import {List,Stepper,Icon,SearchBar} from 'antd-mobile';
const Item = List.Item;
const Brief = Item.Brief;

class ShoppingCart extends Component{
    constructor(){
        super();
        this.state = {
            goolist:[],
        }
    }
    componentWillMount(){
        console.log(this.props);
    }
    render(){
        console.log(this.props);
        return <div className="constent_wandering">
        <div id="topbar" className="header" >
            <div  className="header-content">  
                <p  className="header-title">购物车</p>  
            </div>
        </div>
        <SearchBar placeholder="搜索商品" setFocus="focusObj"></SearchBar>
        <List>
				{
					this.props.goodslist.map((goods,idx)=>{
                        let qty = goods.qty;
						return <Item
							key={goods.proId}x
							thumb={'http://i.lifevccdn.com'+goods.ImageUrl}
							extra={<Icon type="cross" onClick={this.props.remove.bind(this,goods.proId)}/>}
						>
							{goods.proName}
							<Brief>{goods.slogan}</Brief>
							<Brief>价格：<span className="price">{goods.proPrice}</span></Brief>
							<Stepper showNumber size="small" value={qty} onChange={this.props.changeQty.bind(this,goods.proId,qty)} />
						</Item>
					})
				}
			</List>
        </div>
    }
}
let mapStateToProps = state=>{
	return {
		goodslist:state.cartReducer.goodslist
	}
}
let mapDispatchToProps = dispatch=>{
	return {
		remove(proId){
			dispatch(cartAction.remove(proId))
		},
		changeQty(proId,qty){
			console.log(proId,qty)
			dispatch(cartAction.change(proId,qty))
		}
	}
}
ShoppingCart = connect(mapStateToProps,mapDispatchToProps)(ShoppingCart);
export {ShoppingCart}