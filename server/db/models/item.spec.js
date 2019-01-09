/* global describe beforeEach it */

const {expect} = require('chai')
const db = require('../index')
const Item = db.model('item')

describe('Item model', () => {
  beforeEach(() => {
    return db.sync({force: true})
  })

  //describe('instanceMethods', () => {
  describe('correctOrder', () => {
    let avalon

    beforeEach(async () => {
      avalon = await Item.create({
        name: 'Avalon',
        description:
          "The Resistance: Avalon pits the forces of Good and Evil in a battle to control the future of civilization. Arthur represents the future of Britain, a promise of prosperity and honor, yet hidden among his brave warriors are Mordred's unscrupulous minions. These forces of evil are few in number but have knowledge of each other and remain hidden from all but one of Arthur's servants. Merlin alone knows the agents of evil, but he must speak of this only in riddles. If his true identity is discovered, all will be lost.",
        price: 1999,
        imageUrl:
          'https://images-na.ssl-images-amazon.com/images/I/71ooTJfPLPL._SL1159_.jpg',
        category: 'board',
        ageRange: '12+'
      })
    })

    it('returns true if the price is correct', () => {
      expect(avalon.price).to.be.equal(1999)
    })

    it('returns true if game category is an accepted value', () => {
      expect(avalon.category).to.satisfy(category => {
        if (category === 'board' || category === 'card') {
          return true
        }
        return false
      })
    })
  }) // end describe('correctPassword')
  // }) // end describe('instanceMethods')
}) // end describe('User model')
