import { combineReducers } from "redux";
import userGlobal from './userGlobal'
import userRegister from './registerReducer'
import movieReducers from './movieReducers'
import subsReducers from './subsReducer'

export default combineReducers({
    user: userGlobal,
    userSignup: userRegister,
    movieGlobal: movieReducers,
    userSubs: subsReducers
})