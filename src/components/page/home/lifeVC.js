import React,{Component} from 'react';
import {Carousel} from 'antd-mobile';
import {withRouter} from 'react-router-dom';
import Header from './header'
import axios from 'axios';
class Home extends Component{
    constructor(){
        super();
        this.state={
            Duckweedlist:[],
             
        }
    }
    render(){
        let {match}=this.props;
        return <div className="home">
        <Header/> 
        </div>
    }
}
Home = withRouter(Home);

export {Home};