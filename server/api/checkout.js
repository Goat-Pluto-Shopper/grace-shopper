const router = require('express').Router()
const {Order} = require('../db/models')

// POST order (on checkout)
router.post('/', async (req, res, next) => {
  try {
    // get cart from req.body from local storage
    const cart = req.body
    const order = await Order.create({
      total: cart.total,
      streetAddress: cart.streetAddress,
      city: cart.city,
      state: cart.state,
      zipcode: cart.zipcode,
      user: cart.user,
      items: cart.items
    })
    await order.setUser(cart.user)
    await order.setItems([cart.items[0]])
    res.json(order)
  } catch (err) {
    next(err)
  }
})

module.exports = router
