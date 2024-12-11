import {createStore, combineReducers} from "redux";
import {productReducer} from "./productReducer";
// Изменить cashReducer 
const rootReducer = combineReducers({
  productReducer
})
export const store = createStore(rootReducer);
