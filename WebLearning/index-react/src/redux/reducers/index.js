import { 
    SET_LOGGED_OUT,
    USER_INFO_LOADED 
} from '../constants/action-types'

const initialState = {
    user_info: [],
    is_tutor: false
}

function rootReducer (state=initialState, action) {
    if (action.type === SET_LOGGED_OUT) {
        return Object.assign({}, state, {
            user_info: [],
            is_tutor: false
        })
    }

    if (action.type === USER_INFO_LOADED) {
        if (action.payload.username === 'admin') {
            return Object.assign({}, state, {
                user_info: action.payload,
                is_tutor: true
            })
        }
        else {
            return Object.assign({}, state, {
                user_info: action.payload,
            })
        }
    }
    return state;
}

export default rootReducer