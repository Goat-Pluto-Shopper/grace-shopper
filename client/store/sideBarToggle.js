//action types
const TOGGLE = 'TOGGLE'

//initial state
const itemState = true

//action creater
export const toggle = state => ({type: TOGGLE, state})

//thunk

export const fetchToggle = state => dispatch => {
  try {
    dispatch(toggle(state))
  } catch (err) {
    console.error(err)
  }
}

export default function(state = itemState, action) {
  switch (action.type) {
    case TOGGLE:
      return action.state
    default:
      return state
  }
}
