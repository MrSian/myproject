import React,{Component} from 'react';
import { Tabs, Badge,List,Carousel,Grid } from 'antd-mobile';
// import {connect} from 'react-redux';

import Getshopping  from './getshopping';

import axios from 'axios';

// import {cart,tabbar} from '../actions';
class Detils  extends Component{
    // 这是主页面
    constructor(){
        super();
        this.state = {
            Detilslist:[],
            Detilsheaderimg:[],
            Detiltext:[],
            DetilImageUrl:[],
            ServiceIcon:[],
            Prompts:[],
            props:[],
            vals:[],
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
        
        // console.log(Detilslist.ItemInfoID)
        let ItemInfoID=Detilslist.ItemInfoId;
        if(ItemInfoID){
            // console.log('111')
        }else{
            ItemInfoID=Detilslist.ItemInfoID;
        }
        // Detilslist.ItemInfoID===null?Detilslist.ItemInfoID:'33333';
        // ItemInfoId
        // http://app.lifevc.com?
        // http://app.lifevc.com/1.0/v_h5_5.1.2_33/items/itemview?Iteminfoid=30861&o=http%3A%2F%2Fm.lifevc.com&NewCartVersion=true
        axios.get("/lifevtwo/1.0/v_h5_5.1.2_33/items/itemview", {
            params: {
                Iteminfoid:ItemInfoID,
                o:'http://m.lifevc.com',
                NewCartVersion:true
            }
          })
          .then(res => {
            let Detilslist = res.data.InnerData
            let Detiltext =Detilslist.Prompts
            let DetilImageUrl=Detilslist.Details
            let ServiceIcon =Detilslist.ServiceIcon
            let Prompts =Detilslist.Prompts
            let props =Detilslist.GroupAttrs.props

            // let vals =props.vals
            let Detilsheaderimg = res.data.InnerData.Headers
            // console.log(Detilslist)
            
            this.setState({
                Detilslist,
                Detilsheaderimg,
                Detiltext,
                DetilImageUrl,
                ServiceIcon,
                Prompts,
                props,
            });
        })
    }
    componentWillUnmount(){
    }
    render(){
    let {Detilslist,DetilImageUrl,ServiceIcon,Prompts, props,vals,} = this.state;
    return <dl i="detilslistdl">
    <Getshopping />
        <div id="topbar" className="header" >
                <div  className="header-content">  
                    <p  className="header-title">商品介绍</p>  
                </div>
        </div>
        <div className="detilstitleimg" >
        <Carousel 
            autoplay={true}
            autoplayInterval={3000}
            infinite={true}
        >
        {this.state.Detilsheaderimg.map((productdest,idx) => (
             <img key={idx} src={'http://i.lifevccdn.com'+productdest.ImageUrl} />
            
            ))}
        </Carousel>
        </div>
        <dd  className="itemprices pd05">
            <div  className="detilstitle">{Detilslist.Name}</div>
            <p  className="detilsdes">{Detilslist.Caption}</p> 
            <div className="detilspricecntr clearfix">
                <em  className="iconmoneylarger">¥</em> 
                <em  className="pricemoneylarger">{Detilslist.SalePrice}</em> 
            </div> 
            <div className="price">
            {/* Prompts[0].Tag.Text */}
                <div className="lablewrap">
                {this.state.Detiltext.map((Detiltexts,idx) => (
                    <span key={idx}  className="promolable" style={{color: 'rgb(253, 238, 238)',background: 'rgb(205, 6, 15)'}}>--{Detiltexts.Tag.Text}</span>
                ))}
            </div>
            </div> 
         </dd>
        <dd  id="promoWrap">
            <div className="promoitem">
                <div >
                    <span  className="tagpromo bgred">优惠</span> 
                    <span  className="mtxt red">登录查看你的积分和优惠券</span>
                </div>
            </div>
        </dd>
        <dd className="GroupAttrs">
            {props.map((propss,idx) => (
                <div key={idx} className="GroupAttrsone">
                    <span >{propss.pname}</span>
                <ul>
                {propss.vals.map((vals,idx) => (
                    <li key={idx}><span>{vals.vname}</span></li>
                ))}
                </ul>
                <br />
                <br />
            </div>
            ))}
            <br />
            <br />
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
                {Prompts.map((Promptss,idx) => (
                    <p  key={idx} >{Promptss.Text}</p>
                ))}
            </div>
        </dd>
        <div  className="ServiceIcon">
        {ServiceIcon.map((ServiceIcons,idx) => (
             <img 
             style={{ width: '100%',  verticalAlign: 'top' }}
             key={idx} 
             src={'http://i.lifevccdn.com'+ServiceIcons.ImageUrl} />
        ))}
        </div>
        <div  className="hesmartop">
        {DetilImageUrl.map((ImageUrls,idx) => (
             <img 
             style={{ width: '100%', height:'375px', verticalAlign: 'top' }}
             key={idx} 
             src={'http://i.lifevccdn.com'+ImageUrls.ImageUrl} />
        ))}
        </div>
    </dl>
    }
}
export {Detils}