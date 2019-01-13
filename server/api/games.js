const router = require('express').Router()
const {Item} = require('../db/models')
const db = require('../db/db')

// GET all games unless there is a search!
// http://localhost:8080/api/games
router.get('/', async (req, res, next) => {
  try {
    if (Object.keys(req.query).length !== 0) {
      let games = await db.query(
        'SELECT * from items where ' +
          '((:category) is null or items.category IN (:category)) and ' +
          '((:ageRange) is null or items."ageRange" IN (:ageRange)) and ' +
          '((:tags) is null or items.tags && cast(ARRAY[:tags] as varchar[]))',
        {
          replacements: {
            category: !req.query.category ? null : req.query.category,
            ageRange: !req.query.ageRange ? null : req.query.ageRange,
            tags: !req.query.tags ? null : req.query.tags
          },
          type: db.QueryTypes.SELECT
        }
      )
      res.json(games)
    } else {
      console.log('i did not hit query server')
      let games = await Item.findAll()
      res.json(games)
    }
  } catch (err) {
    next(err)
  }
})

//get related
//api/games/related/:id
router.get('/related/:id', async (req, res, next) => {
  try {
    const currentGame = await Item.findById(req.params.id)
    // console.log(currentGame.dataValues, 'item data');
    const relatedGames = await Item.findAll({
      limit: 4,
      where: {
        ageRange: currentGame.dataValues.ageRange,
        tags: {
          $overlap: currentGame.dataValues.tags
        },
        name: {
          $ne: currentGame.dataValues.name
        }
      }
    })
    res.json(relatedGames)
  } catch (err) {
    next(err)
  }
})

// GET single game
// http://localhost:8080/api/games/:id
router.get('/:id', async (req, res, next) => {
  try {
    const id = req.params.id
    const game = await Item.findById(id)
    res.json(game)
  } catch (err) {
    next(err)
  }
})

module.exports = router
