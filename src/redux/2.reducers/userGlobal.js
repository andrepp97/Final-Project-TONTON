import { 
    LOGIN_SUCCESS,
    USER_LOGOUT,
    IS_LOADING,
    NOT_LOADING,
    NAV_ITEM_CHANGE
 } from "../1.actions/types"
 

const INITIAL_STATE = {
    id: 0,
    username: '',
    email: '',
    role: '',
    loading: false,
    checker: false,
    activeTab: ''
}

export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case LOGIN_SUCCESS:
            return {
                ...INITIAL_STATE,
                id: action.payload.id,
                username: action.payload.username,
                email: action.payload.email,
                role: action.payload.role,
                checker: true
            }
        case IS_LOADING:
            return {...INITIAL_STATE, loading : true, checker: true}
        case NOT_LOADING:
            return {...INITIAL_STATE, loading : false, checker: true}
        case USER_LOGOUT:
            return {...INITIAL_STATE, checker: true}
        case NAV_ITEM_CHANGE:
            return {...state, activeTab: action.payload, checker: true}
        default:
            return state
    }
}