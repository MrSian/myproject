import React,{Component} from 'react';
import {cart,tabbar} from '../../../actions';
import {connect} from 'react-redux';
class NotFound extends Component{
    constructor(){
        super();
        this.state = {
        }
    }
    // componentWillMount(){
    //     this.props.changeTabbarStatus(false);
    // }
    render(){
        return <div>
        你所访问的页面不存在!
        </div>
    }
}
class Helep extends Component {
    constructor(){
        super();
        this.state = {
        }
    }
    render(){   
        return <div>
        你需要帮助吗?
        </div>
    }
}
// console.log(this.props)
// let mapStateToProps=state=>({cartlist:state.cartReducer.goodslist});
// NotFound=connect(mapStateToProps)(NotFound)
export {NotFound,Helep}