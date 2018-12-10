import React, {Component}  from 'react';
import {Route,Switch,Redirect,withRouter} from 'react-router-dom';
import {findDOMNode}  from 'react-dom'
import {connect} from 'react-redux';
import { Tabs, WhiteSpace ,PullToRefresh,} from 'antd-mobile';
import '../../css/index.css'
import '../../css/home.scss';
import header_bt from '../../img/header-icon-bt.jpg';
import header_rigth from '../../img/header-icon.jpg';
import Main from './main'
import Newdetil from './Newdetil';
import Zhongguo from './zhongguo'
import { Toast} from 'antd-mobile';


class Home extends Component{
    constructor(){
        super()
        this.state ={
            tabs:[
                { title: '首页' ,path:'/main' },
                { title: '中国' ,path:'/zhongguo' },
                { title: '国际' ,path:'/gouji' },
                { title: '评论' ,path:'/pinglun' },
                { title: '军事' ,path:'/junshi' },
                { title: '财经' ,path:'/caijing' },
              ],
            page:0,
            refreshing: false,
            down: true,
            height: 700,
            data: [],
            pg:0,
            scrollHandler:null
        }
        this.handlClick = this.handlClick.bind(this)
        this.onrefresh = this.onrefresh.bind(this);
        this.goBackPrev = this.goBackPrev.bind(this); 
        this.scrollCallback = this.scrollCallback.bind(this);
    }
    goBackPrev(){
        let {history,location} = this.props;
        var curren1 = location.pathname;
        var curren2 = window.location.hash.slice(1);
        // if(curren1!=curren2){history.go(-1)}     
        history.go(-1)  //回到上一级路由
    }
    componentWillMount(){
        console.log(this.props)
        let {match,history} = this.props
        if(window.location.hash.slice(1)==match.path + '/main'){return} //不重复推送相同path
        let url = match.path + '/main'; //home/main
        console.log(window.location.hash.slice(1)) ///home
        this.props.history.push(url)  //进入home 推到home/main
        let hash = window.location.hash.slice(6);
        let page=0;
        this.state.tabs.some((item,index)=>{
            page = index;
            console.log(hash)
            return item.path===hash;
        })
        this.setState({
            page:page
        })
        
    }
    scrollCallback(callback){
        this.setState({
            scrollHandler:callback
        })
      }

        handlClick(item,index){
        let hash = window.location.hash.slice(1);
            this.state.page = index;
            let {history,match} = this.props
            let url = match.path + item.path
            if(hash==url){return}
            history.push(url)
        }
        
          componentDidMount() {
            const hei = this.state.height - findDOMNode(this.ptr).offsetTop;
            //下拉
            setTimeout(() => this.setState({
                height: hei,
            }), 0);
            //toast土司
            setTimeout(() => {
                Toast.hide();
              }, 3000);
            //滚动事件
            var el = document.getElementsByClassName('am-pull-to-refresh')[0];
            el.addEventListener('scroll',()=>{
                var el = document.getElementsByClassName('am-pull-to-refresh')[0];
                var elScrollTop = el.scrollTop;
                var elHeight = el.offsetHeight;
                var elScrollHeight = el.scrollHeight;
                console.log(elScrollTop)
                console.log(elHeight)
                console.log(elScrollHeight)
                if(elScrollTop+elHeight*1==elScrollHeight){
                    this.props.scroll()
                    Toast.loading('loadding...',1,)    
                }
            },true);
                
          }


        onrefresh(){
            console.log("hellow! there's refresh your data")
            var pg = ++this.state.pg;
            this.setState({
                pg,
            })
            this.setState({ refreshing: true });
            setTimeout(() => {
                this.setState({ refreshing: false });
            }, 1000);
            
        }
    render(){
        

        return(
            <div className="home">
                <div className="header_icon" >
                    <div className="header_bt fl">
                        <img src={header_bt} onClick={()=>{this.goBackPrev()}}></img>
                    </div>
                    <div className="header_rigth fr">
                        <img src={header_rigth}></img>
                    </div>
                </div>
                <div className="header">
                    <WhiteSpace />
                        <Tabs tabs={this.state.tabs}
                         onTabClick={this.handlClick}
                         page={this.state.page}
                         >
                        </Tabs>
                    <WhiteSpace />
                </div>
                <div className="home_body">
                
                <PullToRefresh
                    damping={150}
                    ref={el => this.ptr = el}
                    style={{
                    height: this.state.height,
                    overflow: 'auto',
                    }}
                    indicator={this.state.down ? {} : { deactivate: '上拉可以刷新' }}
                    direction={this.state.down ? 'down' : 'up'}
                    refreshing={this.state.refreshing}
                    onRefresh={this.onrefresh}
                >
                    <div  style={{ textAlign: 'center', padding: 0 }} />
                    <Switch>
                        <Route path={this.props.match.url + "/main"} component={Main} data={this.pg}/>
                        <Route path={this.props.match.url + "/zhongguo"}  component={Zhongguo} />
                        <Route path={this.props.match.url + "/gouji"   } render={()=><div>guoji</div>} />
                        <Route path={this.props.match.url + "/junshi"  } render={()=><div>junshi</div>} />
                        <Route path={this.props.match.url + "/pinglun" } render={()=><div>pinglun</div>} />
                        <Route path={this.props.match.url + "/detil/:id" } component={Newdetil} />
                        {/* <Redirect from='/home' to='/home/main' exact /> */}
                    </Switch>
            </PullToRefresh>
                    
                </div>
            </div>
        )
    }

}
let mapStateToProps = state=>{
    //此处必须返回一个对象  
    // console.log(state);
    return{
        //
        scroll : state.scroll.scrollCallback
    }
}

Home = connect(mapStateToProps)(Home)

Home = withRouter(Home);

export default Home;
