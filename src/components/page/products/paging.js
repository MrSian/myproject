import React,{Component} from 'react';
import axios from 'axios';
import {withRouter} from 'react-router-dom';
import {Tabs, WhiteSpace, Badge,List,Carousel,Grid} from 'antd-mobile';

class Paging extends Component{
    constructor(){
        super();
        this.state={
            tabs:[
                {
                    title:'新品',
                    path:'/home',
                    icon:1,
                },
                {
                    title:'畅销',
                    path:'/Products',
                    icon:2, 
                },
                {
                    title:'价格',
                    path:'/Wandering',
                    icon:3, 
                },
            ],
            paginglist:[],
            parameterdata:[],
            parameterIDdata:'',
            parametertab:1,
        }
        // this.onTabClickpaging=this.onTabClickpaging.bind(this)
    }
    tick(){
        this.state.paginglist=[];
        let {state:parameterdata,IDstate:parameterIDdata} = this.props.location;
        // console.log(this.state.parametertab)
        if(parameterdata){

            //本地存储
            localStorage.setItem('parameterIDdata',JSON.stringify(parameterIDdata));
            localStorage.setItem('parameterdata',JSON.stringify(parameterdata));
        }else{
            // 如果没有传入，则重新发起请求
            parameterIDdata = JSON.parse(localStorage.getItem('parameterIDdata'));
            parameterdata = JSON.parse(localStorage.getItem('parameterdata'));
          
        }
        let datapaging=parameterdata.ItemIndexId;
        axios.get('/lifevtwo/1.0/v_h5_5.1.2_33/Categories/Category',{
            params:{
                itemindexid:parameterIDdata,
                filter:datapaging,
                sort:this.state.parametertab,
                o:'http%3A%2F%2Fm.lifevc.com',
                NewCartVersion:true
            }
        }).then(res=>{
            let data=res.data.InnerData.GoodsItems
            // console.log(data);
                this.setState({
                    paginglist:data,
                })
        })
    }
    componentWillMount(){
        this.tick()
    }
    shouldComponentUpdate(nextProps,nextState){
        console.log(nextState)
        if(this.state.parametertab==nextState.parametertab){
            return true
        }
        // this.tick()
    }
    onTabClickpaging( index,tab){
        // console.log(tab)
        // console.log(index)
        // let {history} = this.props;
        // if(index==tab.icon){
        //     return false;
        // }
        // history.push({
        //     state:tab.icon,
        // });
        this.setState({
            parametertab:tab.icon
        })
        // console.log(this.state.parametertab)
    }
    componentWillUnMount = () => {
        this.setState = (state,callback)=>{
            return;
        };
    }
    render(){
        let {paginglist,tabs}=this.state
        return <div className='paging'>
        <div id="topbar" className="header" >
            <div  className="header-content">  
                <p  className="header-title">全部产品</p>  
            </div>
        </div>
        <Tabs tabs={tabs}
        initialPage={0}
        onChange={(tab, index) => { console.log('onChange', index, tab); }}
        onTabClick={this.onTabClickpaging.bind(this, this.state.parametertab)}
        >
       <div className='wrapShelf'>
            <Grid
            data={paginglist} 
            columnNum={1} 
            activeClassName="active" 
            itemStyle={{height:'310px'}}
            renderItem={(list,idx)=>{
                return(
                    <div className='shelfItem'
                    key={idx}
                    >
                    <a className='itempicig'><img   src={'http://i.lifevccdn.com'+list.ImageUrl} lazy="loaded" /></a>
                    <div className='itemPanel'>
                        <div  className="titleclearFix">
                        {list.Name}
                        </div>
                        <div  className="itemprice">
                            <div  className="pricecont">
                            <span  className="act-tag" ></span> 
                            <span>￥</span> 
                            <span>{list.SalePrice}</span>&nbsp;
                            <span className="originalPrice"></span> 
                            <span  className="promoLable">新</span>
                            </div> 
                            <div className="itemComment">评论：{list.CommentCount}</div>
                        </div>
                    </div>
                </div>
                )
            }}
            onClick={this.handlerGotochannel}
            />
        </div>
        </Tabs>
        </div>
    }
}
Paging = withRouter(Paging);
export  {Paging};