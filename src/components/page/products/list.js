import React,{Component} from 'react';
import axios from 'axios';

import {withRouter} from 'react-router-dom';

import { List,Carousel,Grid } from 'antd-mobile';
const Item = List.Item;
const Brief = Item.Brief;

class Home extends Component{
    constructor(){
        super();
        this.state = {
            //轮播图商品
            ad:[],
            //列表
            goodslist:[]
        }

        this.handlerGotoDetails = this.handlerGotoDetails.bind(this);
    }
    componentWillMount(){
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
        console.log(history);
        history.push({
            pathname:'/goods/'+goods.proId,
            state:goods
        });
    }
    render(){
        return <div>
             <Carousel
                autoplay={true}
                infinite
                >
                {this.state.ad.map(goods => (
                    <a
                    key={goods.proId}
                    href="#"
                    style={{height:'320px'}}
                    >
                    <img
                        src={goods.proImg}
                        style={{ width: '100%', height:'200px', verticalAlign: 'top' }}
                        onLoad={() => {
                            window.dispatchEvent(new Event('resize'));
                        }}
                    />
                    </a>
                ))}
                </Carousel>
            {/* <List renderHeader={() => '热卖商品'}>
                {
                    this.state.goodslist.map(goods=>{
                        return <Item
                        thumb={goods.proImg}
                        arrow="horizontal"
                        onClick={this.handlerClick.bind(this,goods)}
                        key={goods.proId}
                        >
                        <h4>{goods.proName}</h4>
                        <p className="price">原价：<del>{goods.proPrice}</del></p>
                        <p className="price">现价：<span>{goods.proPrice*goods.sellPercent/100}</span></p>
                        </Item>
                    })
                }
                
            
            </List> */}
            <Grid
            data={this.state.goodslist} 
            columnNum={2} 
            activeClassName="active" 
            itemStyle={{height:'260px'}}
            renderItem={(goods,idx)=>{
                return(
                    <div className="goods-item">
                        <img src={goods.proImg} />
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

Home = withRouter(Home);

export {Home};