// //Redux的使用
import {createStore} from 'redux';

import cartReducer from '../reducers/index';
// 创建仓库
let store = createStore(cartReducer);
export default store;