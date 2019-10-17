import {
    ON_USER_REGISTER,
    REGISTER_FAILED,
    REGISTER_SUCCESS
} from "../1.actions/types"


const INITIAL_STATE = {
    success: false,
    emailSuccess: '',
    isLoading: false
}


export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case ON_USER_REGISTER:
            return { ...state, isLoading: true }
        case REGISTER_FAILED:
            return { ...state, isLoading: false }
        case REGISTER_SUCCESS:
            return { ...INITIAL_STATE, success: true, emailSuccess: action.payload }
        default:
            return state
    }
}