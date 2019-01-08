/* global describe beforeEach it */

const {expect} = require('chai')
const db = require('../index')
const Order = db.model('order')

describe('Order model', () => {
  beforeEach(() => {
    return db.sync({force: true})
  })

  //describe('instanceMethods', () => {
  describe('correctOrder', () => {
    let sampleOrder

    beforeEach(async () => {
      sampleOrder = await Order.create({
        date: '2018-10-15 19:10:25-07',
        total: 30.27,
        streetAddress: '123 Alphabet Ave',
        city: 'New York',
        state: 'NY',
        zipcode: 10001
      })
    })

    it('returns true if the street addess is correct', () => {
      expect(sampleOrder.streetAddress).to.be.equal('123 Alphabet Ave')
    })
  }) // end describe('correctPassword')
  // }) // end describe('instanceMethods')
}) // end describe('User model')
