const router = require('express').Router()
const {Item} = require('../db/models')

// GET all games
// http://localhost:8080/api/games
router.get('/', async (req, res, next) => {
  try {
    const games = await Item.findAll()
    res.json(games)
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
