import React,{Component} from 'react';
import axios from 'axios';

import {withRouter} from 'react-router-dom';
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
        console.log(goods)
        let {history} = this.props;
        console.log(history);
        // /home/2860/2877
        history.push({
            pathname:'/home/2860/'+goods.ItemIndexId,
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
                            <Grid
                            data={productdest.Children} 
                            columnNum={3} 
                            activeClassName="active" 
                            itemStyle={{height:'140px'}}
                            renderItem={(goods,idx)=>{
                                return(
                                    <li key={goods.ItemIndexId}>
                                            {/* productli.Icon */}
                                                <img src={'http://i.lifevccdn.com'+goods.Icon} />
                                                <h5 className='activespan'>{goods.Name}</h5>
                                    </li>
                                )
                            }}
                            onClick={this.handlerGotoDetails}
                            />
                        </ul>
                    </div>
                </div>
            ))}
            </div>

        </div>
    }
}

Products = withRouter(Products);

export {Products};