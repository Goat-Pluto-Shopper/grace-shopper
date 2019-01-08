'use strict'

const db = require('../server/db')
const {User, Item, Order} = require('../server/db/models')

async function seed() {
  await db.sync({force: true})
  console.log('db synced!')

  const users = await Promise.all([
    User.create({
      email: 'cody@email.com',
      password: '123',
      firstName: 'Cody',
      lastName: 'Pugman'
    }),
    User.create({
      email: 'murphy@email.com',
      password: '123',
      firstName: 'Murphy',
      lastName: 'McGrady'
    })
  ])

  const items = await Promise.all([
    Item.create({
      name: 'Avalon',
      description:
        "The Resistance: Avalon pits the forces of Good and Evil in a battle to control the future of civilization. Arthur represents the future of Britain, a promise of prosperity and honor, yet hidden among his brave warriors are Mordred's unscrupulous minions. These forces of evil are few in number but have knowledge of each other and remain hidden from all but one of Arthur's servants. Merlin alone knows the agents of evil, but he must speak of this only in riddles. If his true identity is discovered, all will be lost.",
      price: 19.99,
      imageUrl:
        'https://images-na.ssl-images-amazon.com/images/I/71ooTJfPLPL._SL1159_.jpg',
      category: 'board',
      ageRange: '12+'
    }),
    Item.create({
      name: 'Uno',
      price: 10.28,
      category: 'card'
    })
  ])

  const order = await Promise.all([
    Order.create(
      {
        date: '2018-10-15 19:10:25-07',
        total: 30.27,
        streetAddress: '123 Alphabet Ave',
        city: 'New York',
        state: 'NY',
        zipcode: 10001
      },
      Order.create({
        total: 30.27,
        streetAddress: '456 Chickpea Ave.',
        city: 'San Francisco',
        state: 'CA',
        zipcode: 94602
      })
    )
  ])
  console.log(`seeded ${users.length} users`)
  console.log(`seeded successfully`)
}

// We've separated the `seed` function from the `runSeed` function.
// This way we can isolate the error handling and exit trapping.
// The `seed` function is concerned only with modifying the database.
async function runSeed() {
  console.log('seeding...')
  try {
    await seed()
  } catch (err) {
    console.error(err)
    process.exitCode = 1
  } finally {
    console.log('closing db connection')
    await db.close()
    console.log('db connection closed')
  }
}

// Execute the `seed` function, IF we ran this module directly (`node seed`).
// `Async` functions always return a promise, so we can use `catch` to handle
// any errors that might occur inside of `seed`.
if (module === require.main) {
  runSeed()
}

// we export the seed function for testing purposes (see `./seed.spec.js`)
module.exports = seed
