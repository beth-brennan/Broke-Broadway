const router = require('express').Router()
const { models: {User }} = require('../db')
const cors = require('cors')
module.exports = router

router.use(cors());

router.post('/login', async (req, res, next) => {
  try {
    res.send({ token: await User.authenticate(req.body)});
  } catch (err) {
    next(err)
  }
})


router.post('/signup', async (req, res, next) => {
  try {
    const user = await User.create(req.body)
    res.send({token: await user.generateToken()})
  } catch (err) {
    if (err.name === 'SequelizeUniqueConstraintError') {
      res.status(401).send('User already exists')
    } else {
      next(err)
    }
  }
})

router.get('/me', async (req, res, next) => {
  try {
    res.send(await User.findByToken(req.headers.authorization))
  } catch (ex) {
    next(ex)
  }
})

router.get('/unsecurelogin', async (req, res, next) => {
  try {
    const user = await User.findOne({ email: req.body.email, password: req.body.password })
    res.send(user)
  } catch (ex) {
    next(ex)
  }
})
