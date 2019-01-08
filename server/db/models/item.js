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
  price: {
    type: Sequelize.DECIMAL(10, 2),
    allowNull: false,
    validate: {
      notEmpty: true
    }
  },
  imageUrl: {
    type: Sequelize.STRING
  },
  tags: {
    type: Sequelize.ARRAY(Sequelize.STRING)
  },
  category: {
    // board or card
    type: Sequelize.STRING
  },
  ageRange: {
    type: Sequelize.ENUM('4-7', '7-12', '12+')
  }
})

module.exports = Item
