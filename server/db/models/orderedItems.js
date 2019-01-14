const Sequelize = require('sequelize')
const db = require('../db')

const OrderedItems = db.define('orderedItems', {
  price: {
    type: Sequelize.INTEGER,
    allowNull: true
  },
  itemQuantity: {
    type: Sequelize.INTEGER,
    defaultValue: 1
  }
})

module.exports = OrderedItems
