import React,{Component} from 'react';
import axios from 'axios';
import { Tabs, Badge,List,Carousel,Grid,SearchBar  } from 'antd-mobile';

export class ShoppingCart extends Component{
    render(){
        return <div className="wandering">
        <div id="topbar" className="header" >
            <div  className="header-content">  
                <p  className="header-title">购物车</p>  
            </div>
        </div>
        <SearchBar placeholder="搜索商品" setFocus="focusObj"></SearchBar>
        </div>
    }
}