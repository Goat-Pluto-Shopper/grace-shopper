/* global describe beforeEach afterEach it */

import {expect} from 'chai'
import {fetchAllItems, fetchSingleItem} from './item'
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

  describe('fetchAllItems', () => {
    it('eventually dispatches the GET_ALL_ITEMS action', async () => {
      const fakeItems = [
        {
          name: 'Uno',
          price: 10.28
        },
        {
          name: 'Avalon',
          price: 19.99
        },
        {
          name: 'Risk',
          price: 19.97
        }
      ]
      mockAxios.onGet('/api/games').replyOnce(200, fakeItems)
      await store.dispatch(fetchAllItems())
      const actions = store.getActions()
      expect(actions[0].type).to.be.equal('GET_ALL_ITEMS')
      expect(actions[0].items).to.be.deep.equal(fakeItems)
    })
  })

  describe('fetchSingleItem', () => {
    it('eventually dispatches the GET_SINGLE_ITEM action', async () => {
      const fakeItem = {
        id: 1,
        name: 'Uno',
        price: 10.28
      }
      mockAxios.onGet('/api/games/1').replyOnce(200, fakeItem)
      await store.dispatch(fetchSingleItem(1))
      const actions = store.getActions()
      expect(actions[0].type).to.be.equal('GET_SINGLE_ITEM')
      expect(actions[0].item).to.be.deep.equal(fakeItem)
    })
  })
})
