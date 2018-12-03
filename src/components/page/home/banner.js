import React,{Component} from 'react';
import {Carousel,Grid } from 'antd-mobile';
import {withRouter} from 'react-router-dom';
import axios from 'axios';
class Banner extends Component{
    constructor(){
        super();
        this.state={
            // 轮播图数组
            banner:[
                {
	            	mid:1,
	            	bannerImg:'http://images.iytsc.com/data/afficheimg/1530229932655794445.jpg'
	            },
	             {
	            	mid:2,
	            	bannerImg:'http://images.iytsc.com/data/afficheimg/1533749911617862225.jpg'
	            },	
	             {
	            	mid:3,
	            	bannerImg:'http://images.iytsc.com/data/afficheimg/1533749806055339418.jpg'
	            },
	            {
	            	mid:4,
	            	bannerImg:'http://images.iytsc.com/data/afficheimg/1531780273006525429.jpg'
	            }
	            
            ],
            load:[
	            {
	            	lid:1,
	            	img:'http://images.iytsc.com/images/201706/thumb_img/0_thumb_G_1496438775249.jpg',
	            	p1:'容心 全不锈钢单双杆晾衣架室内阳台升降晾晒架...',//折叠落地伸缩晒衣架
	            	p2:'135元购物卡'
	            },
	            {
	            	lid:2,
	            	img:'http://images.iytsc.com/images/201708/thumb_img/0_thumb_G_1502992357652.jpg',
	            	p1:'康佳 KEP-18C01营养锅韩式多功能电热锅家用...',//电煮锅不粘电火锅6L
	            	p2:'¥187.00 + 112元购物卡'
	            },
	            {
	            	lid:3,
	            	img:'http://images.iytsc.com/images/201712/thumb_img/121930_thumb_G_1513121012945.jpg',
	            	p1:'泊泉雅 净白健齿牙膏蔓越莓薄荷护牙龈牙膏*3支',
	            	p2:'64元购物卡'
	            },
	            {
	            	lid:4,
	            	img:'http://images.iytsc.com/images/201706/thumb_img/0_thumb_G_1498083065858.jpg',
	            	p1:'卡卡玩具 蝴蝶结长尾巴猫咪背影抱枕',
	            	p2:'145元购物卡'
	            }
            ],
             
        }
    }
    // componentWillMount(){
    //     axios.get("/lifevone/1.0/v_h5_5.1.2_33/contents/home_v2", {
    //         params: {
    //             o:'http%3A%2F%2Fm.lifevc.com',
    //             NewCartVersion:true
    //         }
    //       })
    //       .then(res => {
    //         let data = res.data.InnerData[0].InnerData;
    //         let Duck=res.data.InnerData;
    //         let Dlist=[];
    //         for(let a=1;a<Duck.length;a++){
    //             Dlist.push(Duck[a].InnerData)
    //         }
            
    //         this.setState({
	// 			banner:data,
	// 			Duckweedlist:Dlist
    //         });
    //       })
    // }
    
    render(){
        let {match}=this.props;
        return <div className="banner">
             <Carousel
          autoplay={true}
          infinite
        >
          {this.state.banner.map(item => (
            <a
              key={item.mid}
              href="#"
              style={{width: '100%' }}
            >
              <img
                src={item.bannerImg}
                alt=""
                style={{ width: '375px', verticalAlign: 'top',height:'185px' }}
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

export default Banner;