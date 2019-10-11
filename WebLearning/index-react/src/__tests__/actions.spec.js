import * as t from '../redux/constants/action-types'
import * as a from '../redux/actions'
import configureMockStore from 'redux-mock-store'
import thunk from 'redux-thunk'
import fetchMock from 'fetch-mock'

const middlewares = [thunk]
const mockStore = configureMockStore(middlewares)

describe('actions tests', () => {
    describe('sync actions', () => {
        it('setLoggedOut() should return action to set logged out', () => {
            const expectedAction = {
                type: t.SET_LOGGED_OUT
            }
            expect(a.setLoggedOut()).toEqual(expectedAction)
        })
    })
    describe('async actions', () => {
        afterEach(() => {
            fetchMock.reset()
            fetchMock.restore()
        })
        it('getUserInfo() should return action user info loaded', () => {
            fetchMock.getOnce('/api/auth/user/', {
                headers: { 'content-type': 'application/json' },
                body: { username: 'testUser', email: 'testMail' },
            })
            const expectedAction = [{
                type: t.USER_INFO_LOADED,
                payload: {username: 'testUser', email: 'testMail'}
            }]
            const store = mockStore({})
            return store.dispatch(a.getUserInfo()).then(() => {
                expect(store.getActions()).toEqual(expectedAction)
            })
        })
    })
})



