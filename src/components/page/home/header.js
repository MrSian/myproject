import React,{Component} from 'react';
import { Tabs} from 'antd-mobile';
import {Route,Switch,withRouter,Redirect} from 'react-router-dom';
import New from './new'
import Channel from './channel'
import {Home} from './home'
import kitchen from './kitchen'
import Life from './Life'
import jiajufu from './jiajufu'
import chuangpin from './chuangpin'
import xisumuyu from './xisumuyu'
class Header extends Component{
    constructor(){
        super();
        this.state={
            // 首页tab选项
            tabs:[
                {"ItemIndexId":'',"title":"首页","Code":"Home","Uri":null},
                {"ItemIndexId":'/new',"title":"新品","Code":"newArrival","Uri":null},
                {"ItemIndexId":'/2860',"title":"家务","Code":"mainCategory","Uri":null},
                {"ItemIndexId":'/2859',"title":"下厨","Code":"mainCategory","Uri":null},
                {"ItemIndexId":'/2861',"title":"生活","Code":"mainCategory","Uri":null},
                {"ItemIndexId":'/2865',"title":"家居服","Code":"mainCategory","Uri":null},
                {"ItemIndexId":'/2862',"title":"床品","Code":"mainCategory","Uri":null},
                {"ItemIndexId":'/3526',"title":"洗漱沐浴","Code":"mainCategory","Uri":null},
                {"ItemIndexId":'/last',"title":"了解Life","Code":"webpage","Uri":"http://m.lifevc.com/Header/help?c=service&n=commitment"}
            ],
            // tab默认高亮
            headerTab:0,
             
        }
        this.handlerTabClick = this.handlerTabClick.bind(this);
    }
    handlerTabClick(tab,idx){
        this.setState({
            headerTab:idx
        })
        //改变url地址
        let {history,match} = this.props;
        let url = match.path + tab.ItemIndexId
        // console.log(match.path)
        if(this.props.history.location.pathname==url){
            return false;
        }
        history.push(url)
    }
    componentWillMount(){
        let hash=window.location.hash.slice(6);
        //找出对应索引值
        // console.log(hash)
        let headerTab=0
        // let sleicehash=this.props.match.path

        this.state.tabs.some((item,idx)=>{
            // console.log(item)
            if(item.ItemIndexId===hash){
                // console.log(idx)
                headerTab=idx
            }
            return item.headerTab===hash
        })
        this.setState({
            headerTab,
        });
    }
    
    render(){
        let {match}=this.props;
        return <div className="headerContent">
            <div  className="wrapHeard">
            <div className="headerIco"></div> 
            <a  href="#/Products">
            <span className="headTypeimg"></span>
            </a>
            </div>
            <Tabs tabs={this.state.tabs}
            initialPage={this.state.headerTab}
            onChange={(tab, index) => {
            }}
            onTabClick={this.handlerTabClick}
            >
            </Tabs>
            <Switch>
                
                {/* {console.log(match)} */}
                {/* <Route path={match.url} component={/} /> */}
                {/* <Redirect from=""  to="/" exact/> */}
                <Route path={match.url+'/new'}  component={New} />
                <Route path={match.url+"/2860"} component={Channel} />
                <Route path={match.url+"/2859"} component={kitchen} />
                <Route path={match.url+"/2861"} component={Life} />
                <Route path={match.url+"/2865"} component={jiajufu} />
                <Route path={match.url+"/2862"} component={chuangpin} />
                <Route path={match.url+"/3526"} component={xisumuyu} />
                <Route path={match.url+"/last"} render={()=><strong>我们的委托生产供应商，给欧美客户的外贸家居订单，产品质量瑕疵率标准，通常在1.5%左右，但我们对委托生产商的质量要求，是0.5%！而在过去一年的时间里，我们的产品，因为质量瑕疵的退货率，低至0.3% —— 即每售出100件商品，只有0.3件产品，会因为质量瑕疵而退货。我们像捍卫我们生命一样，在捍卫我们的产品质量。</strong>} />
                <Route path={match.url+''}  component={Home} />
                {/* <Route path="/404"  render={()=><strong>你访问的页面不存在</strong>} /> */}
            </Switch>
        </div>
    }
}
Header = withRouter(Header);

export default Header;