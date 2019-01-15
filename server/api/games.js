const router = require('express').Router()
const {Item} = require('../db/models')
const db = require('../db/db')

// GET /api/games with optional search params
router.get('/', async (req, res, next) => {
  try {
    let games = await db.query(
      'SELECT * from items where ' +
        '((:category) is null or items.category IN (:category)) and ' +
        '((:ageRange) is null or items."ageRange" IN (:ageRange)) and ' +
        '((:tags) is null or items."tags" && cast(ARRAY[:tags] as varchar[]))',
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
  } catch (err) {
    next(err)
  }
})

// GET api/games/related/:id - get related games
router.get('/related/:id', async (req, res, next) => {
  try {
    const currentGame = await Item.findById(req.params.id)
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

// GET /api/games/:id - get single game
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
