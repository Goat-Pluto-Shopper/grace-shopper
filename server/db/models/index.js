const User = require('./user')
const Order = require('./order')
const Item = require('./item')
const db = require('../db')
const OrderedItems = require('./orderedItems')

// Model Associations
Order.belongsTo(User)
User.hasMany(Order)
Order.hasMany(Item) // breaks orders route?
Order.belongsToMany(Item, {through: OrderedItems})
Item.belongsToMany(Order, {through: OrderedItems})

// Export all models so we can get any model from
// 'db/models'
module.exports = {
  db,
  User,
  Order,
  Item,
  OrderedItems
}
