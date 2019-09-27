import { SET_LOGGED_IN, USER_INFO_LOADED } from '../constants/action-types'
import getCookie from '../getCookie'


export const setLoggedIn = () => {
    return {type: SET_LOGGED_IN}
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
                if (json.username === 'admin') {
                    localStorage.setItem('is_tutor',true)
                }
                else {
                    localStorage.setItem('is_turor', false)
                }
                dispatch({ type: USER_INFO_LOADED, payload: json })
            })
            .catch(err => console.error(err))
    }
}