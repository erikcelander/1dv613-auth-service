import express from 'express'
import AccountController from '../../controllers/api/account-controller.js'

export const router = express.Router()

const controller = new AccountController()

router.post('/register', controller.register)
router.post('/login', controller.login)
router.get('/login', controller.test)
