import { 
    SET_LOGGED_IN,
    USER_INFO_LOADED 
} from '../constants/action-types'

const initialState = {
    logged_in: localStorage.logged_in,
    user_info: []
}

function rootReducer (state=initialState, action) {
    if (action.type === SET_LOGGED_IN) {
        return Object.assign({}, state, {
            logged_in: true
        })
    }

    if (action.type === USER_INFO_LOADED) {
        return Object.assign({}, state, {
            user_info: action.payload
        })
    }
    return state;
}

export default rootReducer