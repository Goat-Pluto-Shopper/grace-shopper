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
    console.log('REQ BODY HERE', checkoutInfo)
    const order = await Order.create({
      total: checkoutInfo.total,
      streetAddress: checkoutInfo.streetAddress,
      city: checkoutInfo.city,
      state: checkoutInfo.state,
      zipcode: checkoutInfo.zipcode,
      userId: checkoutInfo.userId
    })

    console.log('HIIIII ORDER ID IS HERE ----------', order.id)
    // loop over cart items

    const cart = checkoutInfo.cart
    // console.log('CART!!!---------', cart)
    for (let i = 0; i < cart.length; i++) {
      //creates one row in OrderedItems table for each item
      let orderedItem = await OrderedItems.create({
        price: cart[i].price,
        quantity: cart[i].quantity,
        orderId: order.id,
        itemId: cart[i].itemId
      })
    }

    res.json(order)
  } catch (err) {
    next(err)
  }
})

module.exports = router
