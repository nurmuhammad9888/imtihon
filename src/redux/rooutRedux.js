import { combineReducers } from "redux";
import { reducer } from "../pages/Register/UserReducer";

export const rootReduser =  combineReducers({
    user: reducer,
})