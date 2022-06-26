const router = require('express').Router()
const Show = require('../db/models/Show')
const TicketOption = require('../db/models/TicketOption')
module.exports = router

// GET /api/shows
router.get('/', async (req, res, next) => {
  try {
    const shows = await Show.findAll({ include: TicketOption });
    res.json(shows)
  } catch (err) {
    next(err)
  }
});

// GET /api/shows/:id
router.get('/:id', async (req, res, next) => {
  try {
    const show = await Show.findByPk(req.params.id, { include: TicketOption })
    res.json(show)
  } catch (err) {
    next(err)
  }
});
