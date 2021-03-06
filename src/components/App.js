import React,{Component} from 'react';
import {connect} from 'react-redux';
import axios from 'axios';
import { TabBar } from 'antd-mobile';
// 引入TabBar样式
import 'antd-mobile/dist/antd-mobile.css'
import '../css/page.css';
import '../sass/page.scss'
// import lazy from './Lazyload.js'
// 底部 footer
import {Home} from './page/home/lifeVC'  //首页
import {Products} from './page/products/products' //全部产品
import {Paging} from './page/products/paging' 
import {Wandering} from './page/Wandering/Wandering' //闲逛页面
import {ShoppingCart} from './page/ShoppingCart/ShoppingCart'  //购物车
import {Account} from './page/account/account'  //账户中心
import {NotFound,Helep} from './page/NotFound/NotFound'  //404页面
import {Detils} from './page/detils/detils'   //详情页面
import {Login} from './page/login/login' 
import {Register} from './page/register/register' 

import {Route,NavLink,Redirect,Switch,Scene,withRouter} from 'react-router-dom';

// fontawesome 图标库
import { library } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon} from '@fortawesome/react-fontawesome'  //组件
import {
    faStroopwafel, 
    faHome,
    faListUl,
    faCompass,
    faShoppingCart,
    faUser} from '@fortawesome/free-solid-svg-icons'  //图标

library.add(
    faStroopwafel, 
    faHome,
    faListUl,
    faCompass,
    faShoppingCart,
    faUser)


axios.defaults.baseURL="http://localhost:8000";

class App extends Component{
    constructor(){
        super();
        this.state={
            tabs:[
                {
                    title:'首页',
                    path:'/home',
                    icon:'home',
                },
                {
                    title:'全部产品',
                    path:'/Products',
                    icon:'list-ul', 
                },
                {
                    title:'闲逛',
                    path:'/Wandering',
                    icon:'compass', 
                },
                {
                    title:'购物车',
                    path:'/ShoppingCart',
                    icon:'shopping-cart', 
                },
                {
                    title:'账户中心',
                    path:'/account',
                    icon:'user', 
                }
            ],
            currentTab:0,
            num:100, 
        }
    }
    handlerClick(idx,path){
        this.setState({
            currentTab:idx
        });
        
        // 编程时导航:
        if(this.props.history.location.pathname==path){
            return false;
        }
        this.props.history.push(path)
        
        // console.log(this.props)
    }
    componentWillMount(){
        //获取hash的值
        let hash=window.location.hash.slice(1);
        //找出对应索引值
        // console.log(hash)
        let currentTab=0
        this.state.tabs.some((item,idx)=>{
            if(item.path===hash){
                currentTab=idx
            }
            return item.path===hash
        })
        this.setState({
            currentTab
        })
        // console.log(this.props)
    }
    componentWillReceiveProps (nextProps) {
        let hash=nextProps.location.pathname
        let currentTab=0
        this.state.tabs.some((item,idx)=>{
            if(item.path===hash){
                currentTab=idx
            }
            return item.path===hash
        })
        this.setState({
            currentTab
        })
    }
    render(){
        // console.log(this.state)
        return  <div className='classHeader'>
        <div className='constent'>
        <Switch>   
            <Route path="/home" component={Home} />
            <Route path="/Products" component={Products} />
            <Route path="/paging/:id" component={Paging} />
            <Route path="/Wandering" component={Wandering} />
            <Route path="/Detils/:id" component={Detils} />
            <Route path="/ShoppingCart" component={ShoppingCart} />
            <Route path="/account" component={Account} />
            <Route path="/login" component={Login} />
            <Route path="/register" component={Register} />
            <Route path="/404" component={NotFound} />
            <Redirect from="/"  to="/home" exact/>
            <Redirect  to="/404" />
        </Switch>
        </div>
        {/* ui组件 容器组件: 函数创建的无状态组件 称为Ui组件 受控组件 */}
        <TabBar
        unselectedTintColor="#c2c2c2"
        tintColor="green"
        hidden={!this.props.tabbarStatus}
        noRenderContent={true}
        >
            {
                this.state.tabs.map((tab,idx)=>{
                    return  <TabBar.Item
                            title={tab.title}
                            key={tab.path}
                            icon={<FontAwesomeIcon icon={tab.icon}/>}
                            selectedIcon={<FontAwesomeIcon icon={tab.icon} />}
                            selected={this.state.currentTab === idx}
                            onPress={this.handlerClick.bind(this,idx,tab.path)}
                            badge={tab.path == '/ShoppingCart' ? this.props.cartQty : null}
                            >
                            {tab.title}
                            </TabBar.Item>
                })
            }
        </TabBar>
        </div>
    }
}
let mapStateToProps = state=>{
    // 此处必须返回一个对象
    // console.log(state);
    return {
        //把state.commonReducer.tabbarStatus映射到props
        tabbarStatus:state.commonReducer.tabbarStatus,
        cartQty:state.cartReducer.goodslist.length
    }
}
App = connect(mapStateToProps)(App); //{connect} 的使用  把什么暴露出去
// 利用组件传递参数
App=withRouter(App)
export default App;