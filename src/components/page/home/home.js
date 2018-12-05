import React,{Component} from 'react';
import { Tabs, Badge,List,Carousel,Grid } from 'antd-mobile';
import {Route,NavLink,Redirect,Switch,Scene,withRouter} from 'react-router-dom';
import New from './new';
import Header from './header'
import axios from 'axios';
import '../../../css/home.css';
class Home extends Component{
    constructor(){
        super();
        this.state={
            // 轮播图数组
            banner:[],
            // 全部产品列表
            Duckweedlist:[],
             
        }
    }
    componentWillMount(){
        axios.get("/lifevone/1.0/v_h5_5.1.2_33/contents/home_v2", {
            params: {
                o:'http%3A%2F%2Fm.lifevc.com',
                NewCartVersion:true
            }
          })
          .then(res => {
            let data = res.data.InnerData[0].InnerData;
            let Duck=res.data.InnerData;
            let Dlist=[];
            for(let a=1;a<Duck.length;a++){
                Dlist.push(Duck[a].InnerData)
                // console.log(Duck[a].InnerData)
            }
            
            this.setState({
				banner:data,
				Duckweedlist:Dlist
            });
            // console.log(this.state.Duckweedlist)
          })
    }
    render(){
        let {match}=this.props;
        // console.log(this.state.banner);
        return <div className="home">
        <Header/>
            <Carousel
                autoplay={true}
                autoplayInterval={3000}
                infinite={true}
                >
                {this.state.banner.map((goods,idx) => (
                    <a
                    key={idx}
                    // href="#"
                    style={{width: '100%' }}
                    >
                    <img
                        src={"http://i.lifevccdn.com/"+goods.ImageUrl}
                        style={{ width: '100%', height:'250px', verticalAlign: 'top' }}
                        onLoad={() => {
                            window.dispatchEvent(new Event('resize'));
                        }}
                    />
                    </a>
                ))}
                </Carousel>
                <div className="itemCombo">
                {this.state.Duckweedlist.map((loods,idx) => (
                    <div height={loods.ImageHeight} className="slider" key={loods.ImageUrl}>
                        <div height={loods.ImageHeight} className="sliderimg">
                            <img  useMap={'#planetmap'+idx} height={loods.ImageHeight/2} src={"http://i.lifevccdn.com/"+loods.ImageUrl} />
                            <map name={'planetmap'+idx} id={'planetmap'+idx}>
                            {loods.TouchElem.map((loodis,idx) => (
                                    <area  href="http://localhost:9002/#/Products" key={idx}  shape="rect" coords={loodis.BeginXP*3+','+loodis.BeginXP*3+','+loodis.EndXP*3+','+loodis.EndYP*3}></area>
                            ))}
                            </map>
                        </div>
                    </div>
                ))}
                </div>
        </div>
    }
}
Home = withRouter(Home);

export {Home};