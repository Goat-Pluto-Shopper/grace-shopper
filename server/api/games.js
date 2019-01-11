const router = require('express').Router()
const {Item} = require('../db/models')

// GET all games unless there is a search!
// http://localhost:8080/api/games
router.get('/', async (req, res, next) => {
  try {
    // if (req.query) {
    let games = await Item.findAll()
    //test ask marie for sql
    // if (req.query.category) {
    //   games = games.findAll({
    //     where: {
    //       category: {
    //         $contains: req.query.category
    //       }
    //     }
    //   })
    // }
    // if (req.query.ageRange) {
    //   games = games.findAll({
    //     where: {
    //       ageRange: {
    //         $contains: req.query.ageRange
    //       }
    //     }
    //   })
    // }
    // if (req.query.tags) {
    //   games = games.findAll({
    //     where: {
    //       tags: {
    //         $contains: req.query.tags
    //       }
    //     }
    //   })
    // }
    // console.log(games.length);
    res.json(games)
    // }
    // const games = await Item.findAll()
    // res.json(games)
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
