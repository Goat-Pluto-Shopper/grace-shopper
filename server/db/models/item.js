const crypto = require('crypto')
const Sequelize = require('sequelize')
const db = require('../db')

const Item = db.define('item', {
  name: {
    type: Sequelize.STRING,
    allowNull: false,
    validate: {
      notEmpty: true
    }
  },
  description: {
    type: Sequelize.TEXT
  },
  quantity: {
    // item supply
    type: Sequelize.INTEGER
  },
  // price will be pennies and converted on the frontend
  price: {
    type: Sequelize.INTEGER,
    allowNull: false,
    validate: {
      notEmpty: true
    }
  },
  imageUrl: {
    type: Sequelize.STRING
  },
  tags: {
    type: Sequelize.ARRAY(Sequelize.STRING),
    defaultValue: []
  },
  category: {
    // board or card
    type: Sequelize.ENUM('board', 'card')
  },
  ageRange: {
    type: Sequelize.ENUM('4-7', '7-12', '12+')
  }
})

module.exports = Item
