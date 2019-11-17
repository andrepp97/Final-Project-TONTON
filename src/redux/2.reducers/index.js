import { combineReducers } from "redux";
import userGlobal from './userGlobal'
import userRegister from './registerReducer'
import movieReducers from './movieReducers'

export default combineReducers({
    user: userGlobal,
    userSignup: userRegister,
    movieGlobal: movieReducers
})