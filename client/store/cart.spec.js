/* global describe beforeEach afterEach it */

import {expect} from 'chai'
import cartReducer, {ADD_TO_CART} from './cart'
import axios from 'axios'
import MockAdapter from 'axios-mock-adapter'
import configureMockStore from 'redux-mock-store'
import thunkMiddleware from 'redux-thunk'
import history from '../history'

const middlewares = [thunkMiddleware]
const mockStore = configureMockStore(middlewares)

describe('Cart Reducer', () => {
  it('should return the initial state', () => {
    expect(cartReducer(undefined, {})).to.deep.equal([])
  })

  // adding a new item should add a property to the item called cartQuantity - set to 1
  it('should handle ADD_TO_CART - for a new item', () => {
    expect(
      cartReducer([], {
        type: ADD_TO_CART,
        item: {
          name: 'Catan',
          description:
            'Your adventurous settlers seek to tame the remote but rich isle of Catan...',
          quantity: 5,
          price: 4410,
          imageUrl:
            'https://catanshop.com/content/images/thumbs/0000380_catan_600.jpeg',
          tags: ['strategy', 'skill', 'luck'],
          category: 'board',
          ageRange: '12+'
        }
      })
    ).to.deep.equal([
      {
        name: 'Catan',
        description:
          'Your adventurous settlers seek to tame the remote but rich isle of Catan...',
        quantity: 5,
        price: 4410,
        imageUrl:
          'https://catanshop.com/content/images/thumbs/0000380_catan_600.jpeg',
        tags: ['strategy', 'skill', 'luck'],
        category: 'board',
        ageRange: '12+',
        cartQuantity: 1
      }
    ])
  })

  // adding an existing item should NOT push the item to the cart array again, but JUST increment its cartQuantity
  it('should handle ADD_TO_CART - for an existing item', () => {
    expect(
      cartReducer(
        // previous state - cart has catan already
        [
          {
            name: 'Catan',
            description:
              'Your adventurous settlers seek to tame the remote but rich isle of Catan...',
            quantity: 5,
            price: 4410,
            imageUrl:
              'https://catanshop.com/content/images/thumbs/0000380_catan_600.jpeg',
            tags: ['strategy', 'skill', 'luck'],
            category: 'board',
            ageRange: '12+',
            cartQuantity: 1
          }
        ],
        // adds catan to cart
        {
          type: ADD_TO_CART,
          item: {
            name: 'Catan',
            description:
              'Your adventurous settlers seek to tame the remote but rich isle of Catan...',
            quantity: 5,
            price: 4410,
            imageUrl:
              'https://catanshop.com/content/images/thumbs/0000380_catan_600.jpeg',
            tags: ['strategy', 'skill', 'luck'],
            category: 'board',
            ageRange: '12+'
          }
        }
      )
    ).to.deep.equal(
      // new state
      [
        {
          name: 'Catan',
          description:
            'Your adventurous settlers seek to tame the remote but rich isle of Catan...',
          quantity: 5,
          price: 4410,
          imageUrl:
            'https://catanshop.com/content/images/thumbs/0000380_catan_600.jpeg',
          tags: ['strategy', 'skill', 'luck'],
          category: 'board',
          ageRange: '12+',
          cartQuantity: 2
        }
      ]
    )
  })
})
