import {createStore, combineReducers, applyMiddleware} from 'redux'
import createLogger from 'redux-logger'
import thunkMiddleware from 'redux-thunk'
import {composeWithDevTools} from 'redux-devtools-extension'
import user from './user'
import item from './item'
import cart from './cart'
import {throttle} from 'lodash'
import orderHistory from './orderHistory'

// incorporate local storage here too!
import {loadState, saveState} from './localStorage'

const persistedState = loadState()

const reducer = combineReducers({user, item, cart, orderHistory})
const middleware = composeWithDevTools(
  applyMiddleware(thunkMiddleware, createLogger({collapsed: true}))
)
const store = createStore(reducer, persistedState, middleware)

store.subscribe(
  throttle(() => {
    saveState({
      cart: store.getState().cart || []
    })
  }, 1000)
)

export default store
export * from './user'
export * from './item'
export * from './cart'
export * from './orderHistory'
