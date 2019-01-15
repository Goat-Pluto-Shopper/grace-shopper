const router = require('express').Router()
const {User} = require('../db/models')
module.exports = router

router.get('/', async (req, res, next) => {
  try {
    //because we have no admin i did it this way
    if (req.user === process.env.ADMIN_SECRET) {
      const users = await User.findAll({
        // explicitly select only the id and email fields - even though
        // users' passwords are encrypted, it won't help if we just
        // send everything to anyone who asks!
        attributes: ['id', 'email']
      })
      res.json(users)
    } else {
      res.status(403).end()
    }
  } catch (err) {
    next(err)
  }
})
