import axios from 'axios'

/**
 * ACTION TYPES
 */
const GET_ALL_ITEMS = 'GET_ALL_ITEMS'
const GET_SINGLE_ITEM = 'GET_SINGLE_ITEM'
const GET_RELATED_ITEMS = 'GET_RELATED_ITEMS'
const GET_QUERY_ITEMS = 'GET_QUERY_ITEMS'

/**
 * INITIAL STATE
 */
const itemState = {
  allItems: [],
  selectedItem: {},
  relatedItems: []
}

/**
 * ACTION CREATORS
 */
export const getAllItems = items => ({
  type: GET_ALL_ITEMS,
  items
})

const getSingleItem = item => ({
  type: GET_SINGLE_ITEM,
  item
})

const getRelatedItems = items => ({
  type: GET_RELATED_ITEMS,
  items
})

const getQueryItems = items => ({
  type: GET_QUERY_ITEMS,
  items
})

/**
 * THUNK CREATORS
 */

export const fetchAllItems = query => async dispatch => {
  try {
    if (query) {
      const {data} = await axios.get(`/api/games/${query}`)
      dispatch(getAllItems(data || itemState.allItems))
    } else {
      const {data} = await axios.get('/api/games')
      dispatch(getAllItems(data || itemState.allItems))
    }
  } catch (err) {
    console.error(err)
  }
}

export const fetchSingleItem = id => async dispatch => {
  try {
    const res = await axios.get(`/api/games/${id}`)
    dispatch(getSingleItem(res.data || itemState.selectedItem))
  } catch (err) {
    console.error(err)
  }
}

export const fetchRelatedItems = id => async dispatch => {
  try {
    const res = await axios.get(`/api/games/related/${id}`)
    dispatch(getRelatedItems(res.data || itemState.relatedItems))
  } catch (err) {
    console.error(err)
  }
}

/**
 * REDUCER
 */
export default function(state = itemState, action) {
  switch (action.type) {
    case GET_ALL_ITEMS:
      return {...state, allItems: action.items}
    case GET_SINGLE_ITEM:
      return {...state, selectedItem: action.item}
    case GET_RELATED_ITEMS:
      return {...state, relatedItems: action.items}
    default:
      return state
  }
}
