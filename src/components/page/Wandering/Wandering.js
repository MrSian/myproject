import React,{Component} from 'react';
import axios from 'axios';
import { Tabs, Badge } from 'antd-mobile';
import { List,Carousel,Grid } from 'antd-mobile';
import {Route,NavLink,Redirect,Switch,Scene,withRouter} from 'react-router-dom';
import New from './new'
import Home from '../home/home.js'
import './Wandering.css'
// import {unitWidth, width} from '../AppUtil.js';
class Wandering extends Component{
    constructor(){
        super();
        this.state = {
            Wanderinglist:[],
        }
    }
    componentWillMount(){
        axios.get("/lifevthere/1.0/v_h5_5.1.2_33/Stroll/StrollItemList", {
            params: {
                pageNo:1,
                o:'http%3A%2F%2Fm.lifevc.com',
                NewCartVersion:true,
            }
          })
          .then(res => {
            let data = res.data.InnerData;
            // console.log(data)
            this.setState({
				Wanderinglist:data.StrollList.splice(2),
			});
          })
    }
    render(){
        let wandlist=this.state.Wanderinglist;
        return <div className="wandering" style={{background: 'white'}}>
        <div id="topbar" className="header" >
                <div  className="header-content">  
                    <p  className="header-title">闲逛</p>  
                </div>
        </div>
            <div className="clearFix" style={{float: 'left'}}>
                    <div  style={{margin: '3%',width: '94%',clear: 'both'}}>
                        {wandlist.map((wandlistdiv,idx) => (
                           <div key={idx} className="strollTypeItem" style={{ width: '48%',float: 'left'}}>
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
                            </div>
                        ))}
                    </div>
            </div>
        </div>
    }
}
Wandering = withRouter(Wandering);

export {Wandering};