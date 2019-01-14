const router = require('express').Router()
const {Order, Item, OrderedItems} = require('../db/models')

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
    // get cart items from cart redux store
    // get user info from checkout form
    const checkoutInfo = req.body
    const order = await Order.create({
      total: checkoutInfo.total,
      streetAddress: checkoutInfo.streetAddress,
      city: checkoutInfo.city,
      state: checkoutInfo.state,
      zipcode: checkoutInfo.zipcode,
      userId: checkoutInfo.userId
    })
    // loop over cart items
    const orderedItems = await OrderedItems.create({
      orderId: checkoutInfo.orderId,
      itemId: checkoutInfo.itemId,
      price: checkoutInfo.price,
      quantity: checkoutInfo.quantity
    })
    res.json(order)
  } catch (err) {
    next(err)
  }
})

module.exports = router
