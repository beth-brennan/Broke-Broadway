const router = require('express').Router()
const Show = require('../db/models/Show')
const TicketOption = require('../db/models/TicketOption');
const User = require('../db/models/User');
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

// GET /api/shows/favorites/:id
router.get('/favorites/:id', async (req, res, next) => {
  try {
    const user = await User.findByPk(req.params.id)
    const favorites = await user.getShows();
    res.json(favorites);
  } catch (err) {
    next(err);
  }
})

// PUT /api/shows/remove/:userId/:showId
router.put('/remove/:userId/:showId', async (req, res, next) => {
  try {
    const user = await User.findByPk(req.params.userId);
    const show = await Show.findByPk(req.params.showId);
    await user.removeShow(show);
    const favorites = await user.getShows();
    res.json(favorites);
  } catch (err) {
    next(err);
  }
})

// PUT /api/shows/set/:userId/:showId
router.put('/set/:userId/:showId', async (req, res, next) => {
  try {
    const user = await User.findByPk(req.params.userId);
    const show = await Show.findByPk(req.params.showId);
    await user.addShow(show);
    const favorites = await user.getShows();
    res.json(favorites);
  } catch (err) {
    next(err);
  }
})

// GET /api/shows/:id
router.get('/:id', async (req, res, next) => {
  try {
    const show = await Show.findByPk(req.params.id, { include: TicketOption })
    res.json(show)
  } catch (err) {
    next(err)
  }
});

