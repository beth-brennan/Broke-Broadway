const Sequelize = require('sequelize')
const db = require('../db')
const axios = require('axios');

const Show = db.define('show', {
  name: {
    type: Sequelize.STRING,
    allowNull: false,
    validate: {
      notEmpty: true
    }
  },
  type: {
    type: Sequelize.ENUM("play", "musical", "other")
  },
  image: {
    type: Sequelize.STRING,
    defaultValue: 'https://imgur.com/a/huVupwf'
  },
  website: {
    type: Sequelize.STRING,
    validate: {
      isUrl: true
    }
  },
  open_date: Sequelize.DATEONLY,
  close_date: Sequelize.DATEONLY,
  theater: {
    type: Sequelize.STRING,
    allowNull: false,
    validate: {
      notEmpty: true
    }
  },
  address1: Sequelize.STRING,
  address2: Sequelize.STRING
})

module.exports = Show
