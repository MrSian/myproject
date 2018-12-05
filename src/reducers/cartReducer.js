let initState = {
    // 购物车商品别表
    goodslist:[]
}
let commonReducer = (state=initState,action)=>{
    switch(action.type){
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
                goodslist:state.goodslist.filter(goods=>goods.proId!==action.payload)
            }
        //修改商品数量
        case 'CHANGE_GOODS_QTY':
            return {
                ...state,
                goodslist:state.goodslist.filter(goods=>{
                    if(goods.proId === action.payload.proId){
                        goods.qty = action.payload.qty
                    }

                    return true;
                })
            }

        default:
            return state;
    }
}

export default commonReducer;