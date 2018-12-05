import { combineReducers } from "redux";

import cartReducer from './cartReducer';
import commonReducer from './commonReducer';

let rootReducer = combineReducers({
    cartReducer,
    commonReducer
});

export default rootReducer;