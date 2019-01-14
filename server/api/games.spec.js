/* global describe beforeEach it */

const {expect} = require('chai')
const request = require('supertest')
const db = require('../db')
const app = require('../index')
const Item = db.model('item')

const fakeData = {
  name: 'Uno',
  price: 3.99,
  tags: ['world domination', 'uno', 'cards'],
  category: 'card'
}

describe('Games routes', () => {
  beforeEach(() => {
    return db.sync({force: true})
  })

  describe('/api/games/', () => {
    beforeEach(() => {
      return Item.create(fakeData)
    })

    it('GET /api/games', async () => {
      const res = await request(app)
        .get('/api/games')
        .expect(200)

      expect(res.body).to.be.an('array')
      expect(res.body[0].name).to.be.equal('Uno')
    })

    it('GET /api/games/:id', async () => {
      const res = await request(app)
        .get(`/api/games/1`)
        .expect(200)

      expect(res.body.name).to.be.equal('Uno')
    })

    it('checks if there is query', async () => {
      const res = await request(app)
        .get(`/api/games/?tags=uno`)
        .expect(200)

      expect(res.body[0].name).to.be.equal('Uno')
    })
  }) // end describe('/api/games')
}) // end describe('Games routes')
