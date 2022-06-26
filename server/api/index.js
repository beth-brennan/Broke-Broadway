const router = require('express').Router()
const cors = require('cors')
module.exports = router

router.use(cors());

router.use('/users', require('./users'))
router.use('/shows', require('./shows'))

router.use((req, res, next) => {
  const error = new Error('Not Found')
  error.status = 404
  next(error)
})
