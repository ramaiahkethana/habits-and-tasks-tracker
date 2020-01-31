import express from 'express'
import users from './users'
import habits from './habits'
const router = express.Router()

/* GET home page. */
router.get('/', function (req, res, next) {
  res.render('index', { title: 'Donee Me' })
})

router.use(users)
router.use(habits)

export default router
