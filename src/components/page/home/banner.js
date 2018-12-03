import React,{Component} from 'react';
import {Carousel,Grid } from 'antd-mobile';
import {withRouter} from 'react-router-dom';
import axios from 'axios';
class Banner extends Component{
    constructor(){
        super();
        this.state={
            // 轮播图数组
            banner:[],
             
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
        return <div className="banner">
        <Header/>
            <Carousel
                autoplay={true}
                autoplayInterval={3000}
                infinite={true}
                >
                {this.state.banner.map(goods => (
                    <a
                    key={goods.TargetId}
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
        </div>
    }
}
Banner = withRouter(Banner);

export {Banner};