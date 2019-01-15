const router = require('express').Router()
const {User, Order, Item, OrderedItems} = require('../db/models')
const {v4} = require('node-uuid').v4()

//authentication
function isAuthenticated(req, res, next) {
  if (req.user.id) {
    console.log('i hite req user from auteh')
    return next()
  } else {
    console.log('i hit err')
    res.status(403).redirect('/')
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
    // get cart items from cart redux store
    // get user info from checkout form
    const checkoutInfo = req.body
    console.log('REQ BODY HERE', checkoutInfo)
    if (!checkoutInfo.userId) {
      const guestUser = await User.create({
        firstName: checkoutInfo.firstName,
        lastName: checkoutInfo.lastName,
        email: checkoutInfo.email,
        // password: v4()
        password: 'password'
      })
      console.log('guestUser', guestUser)
      checkoutInfo.userId = Number(guestUser.id)
    }
    const order = await Order.create({
      total: checkoutInfo.total,
      streetAddress: checkoutInfo.streetAddress,
      city: checkoutInfo.city,
      state: checkoutInfo.state,
      zipcode: Number(checkoutInfo.zipcode),
      userId: Number(checkoutInfo.userId)
    })

    // console.log('HIIIII ORDER ID IS HERE ----------', order.id)
    // loop over cart items

    const cart = checkoutInfo.cart
    // console.log('CART!!!---------', cart)

    // loop over cart items
    for (let i = 0; i < cart.length; i++) {
      //creates one row in OrderedItems table for each item
      let orderedItem = await OrderedItems.create({
        price: Number(cart[i].price),
        quantity: Number(cart[i].quantity),
        orderId: Number(order.id),
        itemId: Number(cart[i].id)
      })
    }

    res.json(order)
  } catch (err) {
    next(err)
  }
})

module.exports = router
