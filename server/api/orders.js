const router = require('express').Router()
const {User, Order, Item, OrderedItems} = require('../db/models')

//authentication
function isAuthenticated(req, res, next) {
  if (req.user.id) {
    return next()
  } else {
    res.status(403).end()
  }
}

// GET /api/orders/ - user's past items
router.get('/', isAuthenticated, async (req, res, next) => {
  try {
    // userid needs to be in the request body
    const orders = await Order.findAll({
      where: {userId: req.user.id},
      include: [{model: Item}],
      order: [['id', 'DESC']]
    })
    res.json(orders[0].items)
  } catch (err) {
    next(err)
  }
})

// POST /api/orders - order (on checkout)
router.post('/', async (req, res, next) => {
  try {
    // get user info from checkout form
    const checkoutInfo = req.body
    if (!checkoutInfo.userId) {
      const guestUser = await User.create({
        firstName: checkoutInfo.firstName,
        lastName: checkoutInfo.lastName,
        email: checkoutInfo.email,
        password: 'password'
      })
      checkoutInfo.userId = Number(guestUser.id)
    }
    console.log(checkoutInfo)
    const order = await Order.create({
      total: checkoutInfo.total,
      streetAddress: checkoutInfo.streetAddress,
      city: checkoutInfo.city,
      state: checkoutInfo.state,
      zipcode: Number(checkoutInfo.zipcode),
      userId: Number(checkoutInfo.userId)
    })

    const cart = checkoutInfo.cart

    // loop over cart items
    for (let i = 0; i < cart.length; i++) {
      //creates one row in OrderedItems table for each item
      await OrderedItems.create({
        price: Number(cart[i].price),
        itemQuantity: Number(cart[i].cartQuantity),
        orderId: Number(order.id),
        itemId: Number(cart[i].id)
      })
    }

    res.sendStatus(201)
  } catch (err) {
    next(err)
  }
})

module.exports = router
