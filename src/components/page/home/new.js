import React,{Component} from 'react';
import { Tabs, Badge,List,Carousel,Grid } from 'antd-mobile';
import {Route,NavLink,Redirect,Switch,Scene,withRouter} from 'react-router-dom';
import axios from 'axios';
class New extends Component{
    constructor(){
        super();
        this.state={
            newlist:[],
        }
    }
    componentWillMount(){
        // http://app.lifevc.com/1.0/v_h5_5.1.2_33/Categories/Category?itemindexid=2860&filter=2877&sort=2&o=http%3A%2F%2Fm.lifevc.com&NewCartVersion=true
        axios.get("/lifevone/1.0/v_h5_5.1.2_33/Categories/Category", {
            params: {
                itemindexid:2860,
                filter:3453,
                sort:2,
                o:'http%3A%2F%2Fm.lifevc.com',
                NewCartVersion:true,
            }
          })
          .then(res => {
            //   console.log(res);
            let data = res.data.InnerData
            // console.log(data)
            this.setState({
				newlist:data.CEORecommends,
            });
            console.log(this.state.newlist)
          })
    }
    newslistclick(data,item){
        //获取history
        // console.log(data)
        // console.log(item)
        let {history} = this.props;
        // console.log(history);
        history.push({
            pathname:'/Detils/'+data.ItemInfoId,
            state:data
        });
    }
    render(){
    return <div className='wrapShelf'>
    <div className="subcattitle">最近一周新品</div>
    {this.state.newlist.map((news,idx) => (
        <div className='shelfItem'
        key={idx}
        >
        <a className='itempicig'><img onClick={this.newslistclick.bind(this, news)}  src={'http://i.lifevccdn.com'+news.ImageUrl} lazy="loaded" /></a>
        <div className='itemPanel'>
            <div  className="titleclearFix">
            {news.Name}
            </div>
            <div  className="itemprice">
                <div  className="pricecont">
                <span  className="act-tag" ></span> 
                <span>￥</span> 
                <span>{news.SalePrice}</span>&nbsp;
                <span className="originalPrice"></span> 
                <span  className="promoLable">新</span>
                </div> 
                <div className="itemComment">评论：{news.CommentCount}</div>
            </div>
        </div>
    </div>
    ))}
</div>
}
}
New = withRouter(New);

export default New;