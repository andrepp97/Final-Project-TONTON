import { combineReducers } from "redux";
import userGlobal from './userGlobal'
import userRegister from './registerReducer'

export default combineReducers({
    user: userGlobal,
    userSignup: userRegister
})