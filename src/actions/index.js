// 关于购物车的actions creater
//* as   所有的
import * as cart from './cartActions';//{add,remove,change}

export function tabbar(status){
    return {
        type:'CHANGE_TABBAR_STATUS',
        payload:status
    }
}

export {cart};