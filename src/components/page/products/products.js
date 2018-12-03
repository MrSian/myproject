import React,{Component} from 'react';
import axios from 'axios';

import {withRouter} from 'react-router-dom';
import './products.css'
import { List,Carousel,Grid,SearchBar } from 'antd-mobile';
const Item = List.Item;
const Brief = Item.Brief;

class Products extends Component{
    constructor(){
        super();
        this.state = {
            //列表
            goodslist:[],
            produls:[],
        }

        this.handlerGotoDetails = this.handlerGotoDetails.bind(this);
    }
    componentWillMount(){
        // http://m.lifevc.com/h5/#/channelsub/2860/2877
        //http://m.lifevc.com/h5/#/channelsub/2860/2884
        // 获取tap商品
        axios.get("/lifevone/1.0/v_h5_5.1.2_33/categories/allCategory", {
            params: {
                o:'http%3A%2F%2Fm.lifevc.com',
                NewCartVersion:true
            }
          })
          .then(res => {
            let data = res.data.InnerData;
            // let Duck=res.data.InnerData;
            // let Dlist=[];
            // console.log(data)
            this.setState({
				produls:data,
			});
          })
		axios.get('/jxapi/m_v1/promote/qgajax.do',{
			params:{
				t:Date.now(),
				pagenum:1,
				tabnum:1
			}
		}).then(res=>{
			let data = res.data;
			
			this.setState({
				ad:data.killProList.slice(0,4),
				goodslist:data.killProList.slice(4)
			});
		});
    }
    handlerGotoDetails(goods){
        //获取history
        let {history} = this.props;
        // console.log(history);
        history.push({
            pathname:'/goods/'+goods.proId,
            state:goods
        });
    }
    render(){
        let productnews=this.state.produls;
        // console.log(productnews);
        return <div>
            <div id="topbar" className="header" >
                <div  className="header-content">  
                    <p  className="header-title">全部产品</p>  
                </div> 
                <div  id="wrap" className="search-panel">
                    <div  id="search-bar">
                        <SearchBar className="searchinput" placeholder="搜索商品" setFocus="focusObj"></SearchBar>
                    </div>
                </div> 
            </div>

            <div className="productPage">
            {productnews.map(productdest => (
                <div key={productdest.ItemIndexId} className="productstitle">
                    <span className="productspan">
                    {productdest.Name}
                    </span>
                    <div>
                        <ul className="onlyStyle">
                        {productdest.Children.map(productli => (
                            <li key={productli.ItemIndexId}>
                            {/* productli.Icon */}
                                <img src={'http://i.lifevccdn.com'+productli.Icon} />
                                <span>{productli.Name}</span>
                            </li>
                        ))}
                        </ul>
                    </div>
                </div>
            ))}
            </div>
            <Grid
            data={this.state.goodslist} 
            columnNum={2} 
            activeClassName="active" 
            itemStyle={{height:'330px'}}
            renderItem={(goods,idx)=>{
                return(
                    <div className="goods-item">
                        <img width='100%' src={goods.proImg} />
                        <h4>{goods.proName}</h4>
                        <p className="price">原价：<del>{goods.proPrice.toFixed(2)}</del></p>
                        <p className="price">现价：<span>{(goods.proPrice*goods.sellPercent/100).toFixed(2)}</span></p>
                    </div>
                )
            }}
            onClick={this.handlerGotoDetails}
            />

        </div>
    }
}

Products = withRouter(Products);

export {Products};