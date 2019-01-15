const router = require('express').Router()
const User = require('../db/models/user')
module.exports = router

router.post('/login', async (req, res, next) => {
  try {
    const user = await User.findOne({where: {email: req.body.email}})
    if (!user) {
      console.log('No such user found:', req.body.email)
      res.status(401).send('Wrong username and/or password')
    } else if (!user.correctPassword(req.body.password)) {
      console.log('Incorrect password for user:', req.body.email)
      res.status(401).send('Wrong username and/or password')
    } else {
      req.login(user, err => (err ? next(err) : res.json(user)))
    }
  } catch (err) {
    next(err)
  }
})

router.post('/signup', async (req, res, next) => {
  try {
    console.log(req.body, 'req body from sign up')
    let info = {
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      email: req.body.email,
      password: req.body.password
    }
    const user = await User.create(info)
    req.login(user, err => (err ? next(err) : res.json(user)))
  } catch (err) {
    if (err.name === 'SequelizeUniqueConstraintError') {
      res.status(401).send('User already exists')
    } else {
      next(err)
    }
  }
})

router.post('/logout', (req, res) => {
  console.log('hit ogout')
  req.logout()
  req.session.destroy()
  res.status(200).end()
})

router.get('/me', (req, res) => {
  // console.log(req.user, 'req user from auth me')
  // console.log(req.session.user.dataValues, 'req user from auth me');
  res.json(req.user)
})

// router.get('/me', async (req, res, next) => {
//   try {
//     if (!req.session.userId) {
//       if (req.user) {
//         req.session.user = req.user.id
//         res.json(req.user)
//       } else {
//         req.session.user = 'guest'
//       }
//     } else {
//       let user = await User.findById(req.session.userId)
//       if (user) {
//         req.session.user = user.id
//         res.json(user)
//       } else {
//         req.session.user = 'guest'
//         next()
//       }
//     }
//   } catch (error) {
//     next(error)
//   }
// })

router.use('/google', require('./google'))
