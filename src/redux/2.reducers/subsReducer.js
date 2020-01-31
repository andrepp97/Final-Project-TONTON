import {
    USER_SUBS
} from "../1.actions/types"

const INITIAL_STATE = {
    idSubs: 0,
    subsName: '',
    remaining: 0,
    subStatus: ''
}

export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case USER_SUBS:
            return {
                ...state,
                idSubs: action.payload.idSubs,
                subsName: action.payload.subsName,
                remaining: action.payload.remaining,
                status: action.payload.status
            }
        default:
            return state
    }
}