import React,{Component} from 'react';
import axios from 'axios';
import {findDOMNode}  from 'react-dom'
import { Tabs, Badge } from 'antd-mobile';
import { List,Carousel,Grid,PullToRefresh,Toast } from 'antd-mobile';
import {Route,NavLink,Redirect,Switch,Scene,withRouter} from 'react-router-dom';
import New from './new'
class Wandering extends Component{
    constructor(){
        super();
        this.state = {
            Wanderinglist:[],
            currentTab:0,
            num:100, 
            page:1,
            refreshing: false,
            down: true,
            height: 700,
            scrollHandler:null
        }
        this.WanderingDetails = this.WanderingDetails.bind(this);
        this.onrefresh = this.onrefresh.bind(this);
    }
    axioslist(){
        axios.get("/lifevthere/1.0/v_h5_5.1.2_33/Stroll/StrollItemList", {
            params: {
                pageNo:this.state.page,
                o:'http%3A%2F%2Fm.lifevc.com',
                NewCartVersion:true,
            }
          })
          .then(res => {
            let datalist=this.state.Wanderinglist;
            let data = res.data.InnerData.StrollList;
            // console.log(data)
            if(data.length==0){
                console.log('已经没有数据了')
            }
            for(var i = 0; i < data.length; i++) {
                if(data[i].ImageUrl == null) {
                    data.splice(i,1);
                   i = i - 1; // i - 1 ,因为空元素在数组下标 2 位置，删除空之后，后面的元素要向前补位，
                                    // 这样才能真正去掉空元素,觉得这句可以删掉的连续为空试试，然后思考其中逻辑
                 }
            }
            this.setState({
				Wanderinglist:datalist.concat(data),
			});
          })
    }
    componentWillMount(){
        this.axioslist();
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
            if(elScrollTop+elHeight*1==elScrollHeight-1){
                // console.log(elScrollTop+elHeight)
                var page = ++this.state.page;
                this.setState({
                    page,
                })
                this.axioslist();
                Toast.loading('loadding...',1,)    
            }
        },true);
            
      }
    onrefresh(){
        console.log("hellow! there's refresh your data")
        var page = ++this.state.page;
        // console.log(page)
        this.setState({
            page,
        })
        this.axioslist();
        this.setState({ Wanderinglist:[],refreshing: true });
        setTimeout(() => {
            this.setState({ 
                refreshing: false ,
            });
        }, 1000);
        
    }
    WanderingDetails(goods){
        //获取history
        // console.log(goods)
        let {history} = this.props;
        // console.log(history);
        history.push({
            pathname:'/Detils/'+goods.ItemInfoID,
            state:goods
        });
    }
    render(){
        let wandlist=this.state.Wanderinglist;
        let {match}=this.props;
        return <div className="wandering" style={{background: 'white'}}>
        <div id="topbar" className="header" >
                <div  className="header-content">  
                    <p  className="header-title">闲逛</p>  
                </div>
        </div>
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
            <div className="clearFix">
                    <div  style={{margin: '3%',width: '94%',clear: 'both'}}>
                    <Grid
                    data={wandlist} 
                    columnNum={2} 
                    activeClassName="active" 
                    itemStyle={{height:'300px'}}
                    renderItem={(wandlistdiv,idx)=>{
                        return(
                            <div key={idx} className="strollTypeItem" >
                                <div className="strollItemLayer">
                                    <img className="strollItemImg" src={"http://i.lifevccdn.com"+wandlistdiv.ImageUrl} lazy="loaded" /> 
                                    <span className="tagNew">N E W</span>
                                </div> 
                                <h3 className="strollItemTitle">
                                <a>{wandlistdiv.Name}</a>
                                </h3> 
                                <div className="strollPriceBar">
                                    <span className="price">￥<em>{wandlistdiv.SalePrice}</em></span> 
                                    <span className="comment">月销 {wandlistdiv.SaleQty}</span>
                                </div>
                                {/* <Switch>
                                    <Route path={match.url+wandlistdiv.ItemInfoID}  component={Detils} />
                                </Switch> */}
                            </div>
                        )
                    }}
                    onClick={this.WanderingDetails}
                    />
                    </div>
            </div>
            </PullToRefresh>
        </div>
    }
}
Wandering = withRouter(Wandering);

export {Wandering};