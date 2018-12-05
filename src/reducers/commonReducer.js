// 预设我们修改函数
let initState = {  //初始化
    // 是否显示底部tab菜单
    tabbarStatus:true
}
let commonReducer = (state=initState,action)=>{
    switch(action.type){
        case 'CHANGE_TABBAR_STATUS':
            return {
                ...state,
                tabbarStatus:action.payload
            }

        default:
            return state;  
    }
}

export default commonReducer;