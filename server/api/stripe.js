// const router = require('express').Router()
// const {User, Order, Item, OrderedItems} = require('../db/models')
// const stripe = require('stripe')(process.env.STRIPE_SK)
// con

// router.post('/', async (req, res) => {
//   console.log('req.body', req.body)
//   try {
//     let {status} = await stripe.charges.create({
//       amount: 2000,
//       currency: 'usd',
//       description: 'An example charge',
//       source: req.body
//     })

//     res.json({status})
//   } catch (err) {
//     console.log(err)
//     res.status(500).end()
//   }
// })

// module.exports = router
