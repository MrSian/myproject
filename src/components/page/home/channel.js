import React,{Component} from 'react';
import { Tabs, Badge,List,Carousel,Grid } from 'antd-mobile';
import {Route,NavLink,Redirect,Switch,Scene,withRouter} from 'react-router-dom';
import axios from 'axios';
class Channel extends Component{
    constructor(){
        super();
        this.state={
            channelimg:[],
            channellist:[],
            channeheader:{},
            channetitle:'',

        }
    }
    componentWillMount(){
        let hash=window.location.hash.slice(7);
        this._isMounted = true;
        axios.get("/lifevone/1.0/v_h5_5.1.2_33/Categories/Category", {
            params: {
                itemindexid:hash,
                filter:3453,
                sort:2,
                o:'http%3A%2F%2Fm.lifevc.com',
                NewartVersion:true,
            }
          })
          .then(res => {
            let data = res.data.InnerData
            // console.log(data)
            if(this._isMounted){
                this.setState({
                    channellist:data.CEORecommends,
                    channeheader:data.DesignerMessageImg,
                    channetitle:data.CEORecommendTitle.Text,
                });
            }
          })
          axios.get("/lifevone/1.0/v_h5_5.1.2_33/categories/allCategory", {
            params: {
                o:'http%3A%2F%2Fm.lifevc.com',
                NewCartVersion:true
            }
          })
          .then(res => {
            let data = res.data.InnerData[0];
            if(this._isMounted){
                this.setState({
                    channelimg:data.Children,
                });
            }
            // console.log(this.state.channetitle)
          })
    }
    // componentWillUnMount = () => {
    //     this._isMounted = false;
    //     console.log(this._isMounted)
    // }
    componentWillUnmount = () => {
        this.setState = (state,callback)=>{
          return;
        };
    }
    channellistclick(data,item){
        let {history} = this.props;
        history.push({
            pathname:'/Detils/'+data.ItemInfoId,
            state:data
        });
    }
    render(){
    let {channelimg}=this.state
    return <div className='wrapShelf'>
    <div className="subcattitle"> 
        <Grid
        data={channelimg} 
        columnNum={4} 
        activeClassName="active" 
        itemStyle={{height:'120px'}}
        renderItem={(goods,idx)=>{
            return(
                <li key={idx}>
                            <img style={{height:'80px'}} src={'http://i.lifevccdn.com'+goods.Icon} />
                            <h6 className='activespan'>{goods.Name}</h6>
                </li>
            )
        }}
        onClick={this.handlerGotochannel}
        />
        <div className="channellistheaderimg"><img src={'http://i.lifevccdn.com'+this.state.channeheader} /></div>
        <div className="subcat-title">{this.state.channetitle}</div>
    </div>
    {this.state.channellist.map((channel,idx) => (
        <div className='shelfItem'
        key={idx}
        >
        <a className='itempicig'><img onClick={this.channellistclick.bind(this, channel)}  src={'http://i.lifevccdn.com'+channel.ImageUrl} lazy="loaded" /></a>
        <div className='itemPanel'>
            <div  className="titleclearFix">
            {channel.Name}
            </div>
            <div  className="itemprice">
                <div  className="pricecont">
                <span  className="act-tag" ></span> 
                <span>￥</span> 
                <span>{channel.SalePrice}</span>&nbsp;
                <span className="originalPrice"></span> 
                <span  className="promoLable">新</span>
                </div> 
                <div className="itemComment">评论：{channel.CommentCount}</div>
            </div>
        </div>
    </div>
    ))}
</div>
}
}
// Channel = withRouter(Channel);

export default Channel;