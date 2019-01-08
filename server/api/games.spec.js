/* global describe beforeEach it */

const {expect} = require('chai')
const request = require('supertest')
const db = require('../db')
const app = require('../index')
const Item = db.model('item')

describe('Games routes', () => {
  beforeEach(() => {
    return db.sync({force: true})
  })

  describe('/api/games/', () => {
    beforeEach(() => {
      return Item.create({
        name: 'Uno',
        price: 3.99,
        tags: ['world domination', 'uno', 'cards'],
        category: 'card'
      })
    })

    it('GET /api/games', async () => {
      const res = await request(app)
        .get('/api/games')
        .expect(200)

      expect(res.body).to.be.an('array')
      expect(res.body[0].name).to.be.equal('Uno')
    })
  }) // end describe('/api/games')
}) // end describe('Games routes')
