const crypto = require('crypto')
const Sequelize = require('sequelize')
const db = require('../db')

const Order = db.define('order', {
  date: {
    type: Sequelize.DATE,
    defaultValue: Sequelize.NOW
  },
  total: {
    // total price
    type: Sequelize.DECIMAL(10, 2) // check if this rounds correctly
  }
})

module.exports = Order
