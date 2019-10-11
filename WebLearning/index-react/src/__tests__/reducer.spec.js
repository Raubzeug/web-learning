import RootReducer, { initialState } from '../redux/reducers'
import * as t from '../redux/constants/action-types'
import rootReducer from '../redux/reducers'


describe('reducer tests', () => {
    describe('user info reducer', () => {
        it('USER_INFO_LOADED pupil user', () => {
            const action = {
                type: t.USER_INFO_LOADED,
                payload: [1,2,3]
            }
            expect(rootReducer(initialState, action)).toEqual({
                ...initialState,
                user_info: action.payload
            })
        })
        it('USER_INFO_LOADED tutor user', () => {
            const action = {
                type: t.USER_INFO_LOADED,
                payload: {username: 'admin'}
            }
            expect(rootReducer(initialState, action)).toEqual({
                ...initialState,
                user_info: action.payload,
                is_tutor: true
            })
        })
    })
    describe('logout reducer', () => {
        it('logging out', () => {
            const initialStateWithUser = {
                user_info: {username: 'admin'},
                is_tutor: true
            }
            const action = {
                type: t.SET_LOGGED_OUT
            }
            expect(rootReducer(initialStateWithUser, action)).toEqual({
                ...initialStateWithUser,
                user_info: [],
                is_tutor: false
            })
        })
    })
})