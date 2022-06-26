const Sequelize = require('sequelize')
const db = require('../db')
const axios = require('axios');

const TicketOption = db.define('ticketoption', {
  type: {
    type: Sequelize.ENUM("Digital Lottery", "Digital Rush", "Rush", "Lottery", "Standing Room", "Student Rush", "Young People", "Other"),
    allowNull: false,
    validate: {
      notEmpty: true
    }
  },
  price: {
    type: Sequelize.INTEGER,
    allowNull: false,
    validate: {
      notEmpty: true
    }
  },
  restrictions: Sequelize.TEXT,
  link: {
    type: Sequelize.STRING,
    validate: {
      isUrl: true
    }
  }
})

module.exports = TicketOption
