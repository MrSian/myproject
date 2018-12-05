export function add(goods){
    return {
        type:'ADD_TO_CART',
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