/* global describe beforeEach afterEach it */

import {expect} from 'chai'
import {me, logout, auth} from './user'
import axios from 'axios'
import MockAdapter from 'axios-mock-adapter'
import configureMockStore from 'redux-mock-store'
import thunkMiddleware from 'redux-thunk'
import history from '../history'

const middlewares = [thunkMiddleware]
const mockStore = configureMockStore(middlewares)

describe('thunk creators', () => {
  let store
  let mockAxios

  const initialState = {user: {}}

  beforeEach(() => {
    mockAxios = new MockAdapter(axios)
    store = mockStore(initialState)
  })

  afterEach(() => {
    mockAxios.restore()
    store.clearActions()
  })

  describe('me', () => {
    it('eventually dispatches the GET USER action', async () => {
      const fakeUser = {email: 'Cody'}
      mockAxios.onGet('/auth/me').replyOnce(200, fakeUser)
      await store.dispatch(me())
      const actions = store.getActions()
      expect(actions[0].type).to.be.equal('GET_USER')
      expect(actions[0].user).to.be.deep.equal(fakeUser)
    })
  })

  describe('logout', () => {
    it('logout: eventually dispatches the REMOVE_USER action', async () => {
      mockAxios.onPost('/auth/logout').replyOnce(204)
      await store.dispatch(logout())
      const actions = store.getActions()
      expect(actions[0].type).to.be.equal('REMOVE_USER')
      expect(history.location.pathname).to.be.equal('/')
    })
  })

  describe('login', () => {
    it('redirects to home page if previous history was login', async () => {
      history.push('/login')
      history.push('/login')
      mockAxios.onPost('/auth/login').replyOnce(200)
      await store.dispatch(
        auth(null, null, 'cody@email.com', '1234545', 'login')
      )
      expect(history.location.pathname).to.be.equal('/')
    })

    it('redirects back to previous page if not at login', async () => {
      history.push('/card')
      history.push('login')
      mockAxios.onPost('/auth/login').replyOnce(200)
      await store.dispatch(
        auth(null, null, 'cody@email.com', '1234545', 'login')
      )
      expect(history.location.pathname).to.be.equal('/card')
    })
  })
})
