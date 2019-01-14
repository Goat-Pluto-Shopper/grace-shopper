const router = require('express').Router()
const {Order, Item} = require('../db/models')

// GET /api/orders/userId - user's past items
router.get('/:userId', async (req, res, next) => {
  try {
    // userid needs to be in the request body
    const orders = await Order.findAll({
      limit: 1,
      where: {userId: req.params.userId},
      include: [{model: Item}]
    })
    res.json(orders[0].items)
  } catch (err) {
    next(err)
  }
})

// POST /api/orders - order (on checkout)
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
      userId: cart.userId
      // user: cart.user,
      // items: cart.items
    })
    // create orderedItems model and insert into here at the same time
    // await order.setUser(cart.user)
    // await order.setItems([cart.items[0]])
    res.json(order)
  } catch (err) {
    next(err)
  }
})

module.exports = router
