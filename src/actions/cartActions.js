export function add(goods){
    return {
        type:'ADD_TO_CART',
        payload:goods
    }
}
export function jia(goods){
    return {
        type:'ADD_TO_JIA',
        payload:goods
    }
}
export function jian(goods){
    return {
        type:'ADD_TO_JIAN',
        payload:goods
    }
}

export function remove(proId){
    return {
        type:'REMOVE_FROM_CART',
        payload:proId
    }
}

export function change(proId,qty){
    return {
        type:'CHANGE_GOODS_QTY',
        payload:{proId,qty}
    }
}
export function size(proId,size){
    return {
        type:'CHANGE_GOODS_SIZE',
        payload:{proId,size}
    }
}