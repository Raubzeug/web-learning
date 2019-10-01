import { SET_LOGGED_OUT, USER_INFO_LOADED } from '../constants/action-types'
import getCookie from '../../services/getCookie'


export const setLoggedOut = () => {
    return {type: SET_LOGGED_OUT}
}


export const getUserInfo = () => {
    return function(dispatch) {

        return fetch('/api/auth/user/', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
                'X-CSRFToken': getCookie('csrftoken'),
                },
            credentials: 'include',
            })
            .then(response => response.json())
            .then(json => {
                dispatch({ type: USER_INFO_LOADED, payload: json })
            })
            .catch(err => console.error(err))
    }
}