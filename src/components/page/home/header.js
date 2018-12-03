import React,{Component} from 'react';
import { Tabs} from 'antd-mobile';
import {Route,Switch,withRouter,Redirect} from 'react-router-dom';
import New from './new'
import '../../../css/header.css';
class Header extends Component{
    constructor(){
        super();
        this.state={
            // 首页tab选项
            tabs:[
                {"ItemIndexId":'/',"title":"首页","Code":"Home","Uri":null},
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
        console.log(this.state.headerTab)
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
        let hash=window.location.hash.slice(1);
        //找出对应索引值
        let headerTab=0
        
        this.state.tabs.some((item,idx)=>{
            if(item.ItemIndexId===hash){
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
            <a  href="#/all">
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
                <Redirect from=""  to="/" exact/>
                <Route path={match.url+'/new'}  component={New} />
                <Route path={match.url+"/2860"} render={
                    ()=><strong>我的家务页面</strong>
                    
                    } />
                <Route path={match.url+"/2859"} render={()=><strong>我的下厨页面</strong>} />
                <Route path={match.url+"/2861"} render={()=><strong>我的生活页面</strong>} />
                <Route path={match.url+"/2865"} render={()=><strong>我的家居服页面</strong>} />
                <Route path={match.url+"/2862"} render={()=><strong>我的床品页面</strong>} />
                <Route path={match.url+"/3526"} render={()=><strong>我的洗漱沐浴页面</strong>} />
                <Route path={match.url+"/last"} render={()=><strong>我的了解Life页面</strong>} />
                <Route path="/404"  render={()=><strong>我的页面</strong>} />
                {/* <Redirect from="/"  to="/Header" exact/> */}
                {/* <Redirect  to="/404" /> */}
            </Switch>
        </div>
    }
}
Header = withRouter(Header);

export default Header;