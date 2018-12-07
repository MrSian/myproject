import React,{Component} from 'react';

// import {withRouter} from 'react-router-dom';
// import {connect} from 'react-redux';

// import { Button } from 'antd-mobile';

import axios from 'axios';

// import {cart,tabbar} from '../actions';
class Detils  extends Component{
    // 这是主页面
    constructor(){
        super();
        this.state = {
            Detilslist:{

            },
            Detilsimg:{

            }
        }
    }
    componentWillMount(){
        console.log('goodsprops:',this.props)
        // 判断是否传入商品信息
        let {state:Detilslist} = this.props.location;
        if(Detilslist){
            //本地存储
            localStorage.setItem('Detilslist',JSON.stringify(Detilslist));
        }else{
            // 如果没有传入，则重新发起请求
            // let {id} = this.props.match.params;
            // axios.get(`/jxapi/m_v1/goods/detailPromo/${id}`).then(res=>{
            //     this.setState({
            //         goods:res.data
            //     })
            // })

            Detilslist = JSON.parse(localStorage.getItem('Detilslist'));
          
        }
        
        console.log(Detilslist)
        // ItemInfoID
        // http://app.lifevc.com?
        // http://app.lifevc.com/1.0/v_h5_5.1.2_33/items/itemview?Iteminfoid=30861&o=http%3A%2F%2Fm.lifevc.com&NewCartVersion=true
        axios.get("/lifevtwo/1.0/v_h5_5.1.2_33/items/itemview", {
            params: {
                Iteminfoid:30861,
                o:'http://m.lifevc.com',
                NewCartVersion:true
            }
          })
          .then(res => {
            let data = res
            console.log(data)
        })
        this.setState({
            Detilslist
        });
	}
	
	// data.InnerData
	//.CommentList 评论
	//.Details.ImageUrl  下方图片
	// 
    componentWillUnmount(){
    }
    render(){
    let {Detilslist} = this.state;
    return <dl i="detilslistdl">
        <div id="topbar" className="header" >
                <div  className="header-content">  
                    <p  className="header-title">商品介绍</p>  
                </div>
        </div>
        <div className="detilstitleimg">
		{/* .Headers[头部五张图片] */}
            <img />
        </div>
        <dd  className="itemprice pd05">
            <div  className="detilstitle">{Detilslist.Name}</div>
            <p  className="detilsdes">Caption</p> 
            <div className="detilspricecntr clearfix">
                <em  className="iconmoneylarger">¥</em> 
                <em  className="pricemoneylarger">{Detilslist.SalePrice}</em> 
            </div> 
            <div className="price">
                <div className="lablewrap">
                <span  className="promolable" style={{color: 'rgb(253, 238, 238)',background: 'rgb(205, 6, 15)'}}>新</span>
                <span  className="promolable" style={{color: 'rgb(253, 238, 238)',background: 'rgb(205, 6, 15)'}}>Prompts[0].Tag.Text</span>
            </div>
            </div> 
         </dd>
        <dd  id="promoWrap">
            <div className="promoitem">
                <div >
                    <span  className="tagpromo bgred">优惠</span> 
					{/* Prompts[0].Text */}
                    <span  className="mtxt red">登录查看你的积分和优惠券</span>
                </div>
            </div>
        </dd>
        <dd className="GroupAttrs">
            <div className="GroupAttrsone">
			{/* .GroupAttrs.props[].pname */}
                <span>商品: </span>
                <ul>
					{/* .GroupAttrs.props[].pname.vals[].vname */}
                    <li><span>方巾</span></li>
                </ul>
            </div>
            <div className="GroupAttrsone detilstwo">
                <span>规格: </span>
                <ul>
                    <li><span>方巾</span></li>
                    <li><span>方巾</span></li>
                </ul>
            </div>
            <br />
            <br />
            <div className="GroupAttrsone">
                <span>颜色: </span>
                <ul>
                    <li><img /></li>
                </ul>
            </div>
            <br />
            <div className="GroupAttrsone GroupAttrsfive">
                <span>数量: </span>
                <input type="button" value="-"/>
                <input type="text" value="0"/>
                <input type="button" value="+"/>
            </div>
            <br />
            <br />
            <div className="GroupAttrsone GroupAttrfour">
                <span>送至:<a>上海(满￥99免运费)</a></span>
				{/* .Prompts[0] */}
                <p>新会员首单,满69元免运费</p>
            </div>
        </dd>
		{/* .ServiceIcon[0].ImageUrl  服务 */}
        <div  className="hesmartop"></div>
    </dl>
    }
}
export {Detils}

