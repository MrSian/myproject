let initState = {
    goodslist:[],
    total:0
}
let cartReducer = (state=initState,action)=>{
    switch(action.type){
        //添加商品部分
        case 'ADD_TO_CART':
            return {
                ...state,
                goodslist:[...state.goodslist,action.payload]
            }

        // 删除商品部分
        case 'REMOVE_GOODS':
            return {
                ...state,
                goodslist:state.goodslist.filter(goods=>goods.name!=action.payload.name)
            }

        // 计算总价部分
        case 'SUM_PRICE':
        return {
            ...state,
            total:state.goodslist.reduce((prev,current)=>prev+current.price,0)
        }
        default:
            return state;
    }
}

export default cartReducer;