const router = require('express').Router()
const { models: { User }} = require('../db')
const Show = require('../db/models/Show')
module.exports = router

// GET /api/users
router.get('/', async (req, res, next) => {
  try {
    const users = await User.findAll({
      attributes: ['id', 'email']
    })
    res.json(users)
  } catch (err) {
    next(err)
  }
})
