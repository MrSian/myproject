import React,{Component} from 'react';
import {Toast, Tabs, Badge,List,Carousel,Grid } from 'antd-mobile';
import axios from 'axios';
import {cart,tabbar} from '../../../actions';
import {connect} from 'react-redux';
// fontawesome 图标库
import { library } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon} from '@fortawesome/react-fontawesome'  //组件
import {faHome, faShoppingCart,faUser} from '@fortawesome/free-solid-svg-icons'  //图标
library.add(faHome, faShoppingCart,faUser)
class Detils  extends Component{
    // 这是主页面
    constructor(props){
        super(props);
        this.state = {
            Detilslist:[],
            Detilsheaderimg:[],
            Detiltext:[],
            DetilImageUrl:[],
            ServiceIcon:[],
            Prompts:[],
            props:[],
            vals:[],
            dataInfoID:[],
            inpValu:0,
            dellistnumber:0,
        }
        this.gohistory = this.gohistory.bind(this); 
    }
    tick() {
        // 隐藏底部菜单
        this.props.changeTabbarStatus(false);
        // console.log('goodsprops:',this.props)
        // 判断是否传入商品信息
        let {state:Detilslist} = this.props.location;
        if(Detilslist){
            //本地存储
            localStorage.setItem('Detilslist',JSON.stringify(Detilslist));
        }else{
            // 如果没有传入，则重新发起请求
            Detilslist = JSON.parse(localStorage.getItem('Detilslist'));
          
        }
        let dataInfoID=Detilslist;
        let ItemInfoID=Detilslist.ItemInfoId;
        if(ItemInfoID){
        }else{
            ItemInfoID=Detilslist.ItemInfoID;
        }
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
                dataInfoID,
            });
        })
      }
        
    componentWillMount(){
         this.tick()
    }
    gohistory(){
        let {history,location} = this.props;
        var curren1 = location.pathname;
        var curren2 = window.location.hash.slice(1);
        // if(curren1!=curren2){history.go(-1)}
        history.go(-1)  //回到上一级路由
    }
    componentWillUnmount() {
        clearInterval(this.interval);
        this.props.changeTabbarStatus(true);
    }
    jian(){
        if(this.state.inpValu<0){
            this.setState({
                inpValu:0
            })
        }else{
            this.setState({
                inpValu:--this.state.inpValu
            })
        }
        
    }
    jia(){
        if(this.state.inpValu>=100){
            this.setState({
                inpValu:100
            })
        }else{
            this.setState({
                inpValu:++this.state.inpValu
            })
        }
    }
     // 添加到购物车
     handlerAddToCart(goods){
        let has = this.props.cartlist.filter(item=>{
            return item.ItemInfoID == goods.ItemInfoID
        });
        let size='1111111111'
        if(has.length){
            // 存在
            this.props.changeQty(goods.proId,++goods.qty);
            this.setState({
                dellistnumber:goods.qty
            })
        }else{
            goods.qty = this.state.inpValu;
            this.setState({
                dellistnumber:goods.qty
            })
            this.props.addToCart(goods);
            this.props.changeSize(goods.proId,size);
        }
    }
    valuetype(){
        console.log(this)
    }
    componentDidUpdate(){
        if(this.state.DetilImageUrl.length==0){
            Toast.loading('loadding...',)  
        }
    }

    render(){
    let {Detilslist,DetilImageUrl,ServiceIcon,Prompts, props,inpValu,dataInfoID} = this.state;
    return <dl i="detilslistdl">
        <div id="topbar" className="header" >
                <div  className="header-content">
                    <span onClick={this.gohistory}></span>  
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
                <span>商品数量: </span>
                <input onClick={this.jian.bind(this)} type="button" defaultValue="-" />
                <input onChange={this.valuetype.bind(this)} type="text" value={this.state.inpValu} />
                <input onClick={this.jia.bind(this)} type="button" defaultValue="+" />
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
        <div className="getshopping">
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
                <span  className="cart-num">{this.state.dellistnumber}</span>
            </a> 
            <button onClick={this.handlerAddToCart.bind(this,dataInfoID)} className="f-btn-add">加入购物车</button> 
        </footer>
    </div>
    </dl>
    }
}
let mapStateToProps=state=>({cartlist:state.cartReducer.goodslist,number:state.cartReducer.dellistnumber});
let mapDispatchToProps = dispatch=>{
    return {
        // 把changeTabbarStatus方法映射到props
        changeTabbarStatus(status){
            dispatch(tabbar(status));
        },
        addToCart(Detils){
            dispatch(cart.add(Detils))
        },
        changeQty(proId,qty){
            dispatch(cart.change(proId,qty))
        },
        changeSize(proId,size){
            dispatch(cart.size(proId,size))
        },
        jia(Detils){
            dispatch(cart.jia(Detils))
        },
        jian(Detils){
            dispatch(cart.jian(Detils))
        },
    }
}
// provider  :给下面所有子组件提供store   connect(连接)
// 组件分类：ui组件（职责简单，只负责Ui的呈现，内容只依赖props） 容器组件
// 参数1：自定义映射参数  参数2：
Detils=connect(mapStateToProps,mapDispatchToProps)(Detils)
export {Detils}