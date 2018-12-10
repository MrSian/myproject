let initState = {
    // 购物车商品别表
    goodslist:[],
    dellistnumber:0,
}
let commonReducer = (state=initState,action)=>{
    switch(action.type){
        // 增加商品数量
        case 'ADD_TO_JIA':
            state.dellistnumber++
            return {
                ...state,
                dellistnumber:state.dellistnumber
            }
        // 减少商品数量
        case 'ADD_TO_JIAN':
        state.dellistnumber--
            return {
                ...state,
                dellistnumber:state.dellistnumber
            }
            
        //添加商品
        case 'ADD_TO_CART':
            return {
                ...state,
                goodslist:[...state.goodslist,action.payload]
            }
        //删除商品
        case 'REMOVE_FROM_CART':
            return {
                ...state,
                goodslist:state.goodslist.filter(goods=>goods.ItemInfoID!==action.payload)
            }
        //修改商品数量
        case 'CHANGE_GOODS_QTY':
            return {
                ...state,
                goodslist:state.goodslist.filter(goods=>{
                    if(goods.ItemInfoID === action.payload.proId){
                        goods.qty = action.payload.qty
                    }

                    return true;
                })
            }
            // 商品尺寸
            case 'CHANGE_GOODS_SIZE':
            return {
                ...state,
                goodslist:state.goodslist.filter(goods=>{
                    // console.log(goods.ConfigerList)
                    // if(goods.ItemInfoID === action.payload.proId){
                        goods.ConfigerList = action.payload.size
                    // }

                    return true;
                })
            }

        default:
            return state;
    }
}

export default commonReducer;