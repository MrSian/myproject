import React,{Component} from 'react';
import axios from 'axios'
import { Carousel} from 'antd-mobile';
import qs from 'qs';
//import '../../cookie.js';
import './Home/css/header.scss';


import {Route,NavLink,Switch,Redirect,withRouter} from 'react-router-dom';
import { library } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faListUl,faSearch,faAngleRight,faBolt} from '@fortawesome/free-solid-svg-icons'
//使用哪个引用那个
library.add(faListUl,faSearch,faAngleRight,faBolt)

//发送ajax请求之前，要先安装axios;
// npm i --save axious
export class Home extends Component{
	 constructor(){
        super();
        this.state = {
            ad:[],
            goodlist:[],
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
            ] 
        }
       
    }
	setCookie(cname, cvalue, exdays) {
	    var d = new Date();
	    d.setTime(d.getTime() + (exdays * 24 * 60 * 60 * 1000));
	    var expires = "expires=" + d.toUTCString();
//	    console.info(cname + "=" + cvalue + "; " + expires);
	    document.cookie = cname + "=" + cvalue + "; " + expires;
//	    console.info(document.cookie);
    }
	componentDidMount(){
//		//设置cookie
		let str = 'province=2; city=52; district=500; area_region=9; ECS[display]=grid; ECS[history_goods]=125911%2C122122%2C125091%2C123387%2C121716; province=2; city=52; district=500; session_id_ip=61.144.97.251_8ebdb9d7a79cf97ac6b60fbb0a500dea; UM_distinctid=1675f491cd78d-072a89f17bf093-424e0b28-15f900-1675f491cd8ad; CNZZDATA1257355159=508007698-1543491539-http%253A%252F%252Fwww.so.com%252F%7C1543539082; ECSCP_ID=4018626fb1cc55049989bb15abafc962055ab45a; ECS[visit_times]=10';
		var arr=str.split('; ');
		  	var arr2=[];
			for (var i=0;i<arr.length;i++) {
				arr2=arr[i].split('=');
				this.setCookie(arr2[0],arr2[1],7);
			}
			//当前时间戳
	  		let time=new Date().getTime();
//http://www.iytsc.com/mobile/index.php?r=site/Index/async_list&ts=0.24954580644215985
	  		axios.post(`/syapi/mobile/index.php?r=site/Index/async_list&ts=${time}`,
				qs.stringify({
					page: 1,
					size: 10
				}),
				{
					headers:{
						'Content-Type': 'application/x-www-form-urlencoded',
						'Referrer-Policy':'no-referrer' 
						
					}			
				})
	  			.then(res=>{
	  				console.log(res)	  			
	  			})
	  			.catch((err)=>{
	  				console.log(err);
	  			})
//http://www.iytsc.com/mobile/index.php?r=category/index/childcategory&id=1497

	}
	componentWillReceiveProps (nextProps) {
        // console.log(nextProps)
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
		return <div className='home'>
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
				<div className="header">
						<input type="" placeholder='商品/店铺搜索'/>
						<FontAwesomeIcon icon="search" className='icon-two'/>
						<NavLink to='/list'><FontAwesomeIcon icon="list-ul" className='icon'/></NavLink>
						<NavLink to='/list'><p>分类</p></NavLink>
				</div>
				<div className="nav">
					<div className='navimg'>
							<ul>
								<li className='nav-li-one'><NavLink to='/list'>
									<img src='http://www.iytsc.com/mobile/themes/default/img/iconfont-dpfl1.png' />
									<p>全部分类</p>
								</NavLink></li>
								<li className='nav-li-two'><NavLink to='/shopstreet'>
									<img src='http://www.iytsc.com/mobile/themes/default/img/iconfont-dpj.png' />
									<p>店铺街</p>
								</NavLink></li>
								<li className='nav-li-three'><NavLink to='/cart' >
									<img src='http://www.iytsc.com/mobile/themes/default/img/iconfont-gwc.png' />
									<p>购物车</p>
								</NavLink></li>
								<li className='nav-li-four'><NavLink to='/404' >
									<img src='http://www.iytsc.com/mobile/themes/default/img/iconfont-user.png' />
									<p>个人中心</p>
								</NavLink></li>
								<li className='nav-li-five'><NavLink to='/attention' >
									<img src='http://www.iytsc.com/mobile/themes/default/img/iconfont-wdgz.png' />
									<p>我的关注</p>
								</NavLink></li>
								<li className='nav-li-six'><NavLink to='/indent' >
									<img src='http://www.iytsc.com/mobile/themes/default/img/iconfont-wddd.png' />
									<p>我的订单</p>
								</NavLink></li>
								<li className='nav-li-seven'><NavLink to='/money' >
									<img src='http://www.iytsc.com/mobile/themes/default/img/iconfont-zjgl.png' />
									<p>资金管理</p>
								</NavLink></li>
								<li className='nav-li-eight'><NavLink to='/service' >
									<img src='http://www.iytsc.com/mobile/themes/default/img/Navpic-1471498087.png' />
									<p>客户服务</p>
								</NavLink></li>
							</ul>
							
					</div>
				</div>
				
				<div className='content'>
					<span className='content-one'>限时
					<FontAwesomeIcon icon="bolt" className='content-icons'/>
					秒杀</span>
					<span className='content-span'>更多</span>
					<FontAwesomeIcon icon="angle-right" className='content-icon'/>
				</div>
				<div className='loadmore'>
					<h3>精品推荐</h3>
					<span>精品商品尽收眼底赶快行动吧</span>
					<span className='loadmore-one'>更多</span>
					<FontAwesomeIcon icon="angle-right" className='content-icon'/>
				</div>
					<div className='loadlist'>
						<ul>
							{this.state.load.map(item => (
            					<li
            					key={item.mid}>
            					<img
                				src={item.img}/>
            					<p>{item.p1}</p>
            					<p className='loadlist-p2'>{item.p2}</p>
            					</li>
         					))}
						</ul>
					</div>	
					
				
				
		</div>
	}
}
//		axios.get('/text/api/getData/Data').then(res=>{
//			console.log(res.data.items);
//			let data=res.data.items;
//			console.log(data);
//			this.setState({
//				ad:data.slice(0,4),
//				goodlist:data.slice(4)
//			})
//		})