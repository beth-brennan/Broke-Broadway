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

// GET /api/users/:id
router.get('/:id', async (req, res, next) => {
  try {
    const user = await User.findByPk(req.params.id, {
      attributes: ['id', 'email'],
      include: Show
    });
    res.json(user);
  } catch (err) {
    next(err);
  }
})
