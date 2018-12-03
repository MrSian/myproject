export let add = (goods)=>{
    return {
        type:'ADD_TO_CART',
        payload:goods
    }
}


export let remove = (goods)=>{
    return {
        type:'REMOVE_GOODS',
        payload:goods
    }
}

export let sum = ()=>{
    return {
        type:'SUM_PRICE'
    }
}
