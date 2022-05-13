import express from 'express'
import { router as accountRouter } from './api/account-router.js'
import NewError from 'http-errors'

export const router = express.Router()

router.use('/api/auth', accountRouter)

// Catch 404 (ALWAYS keep this as the last route).
router.use('*', (req, res, next) => next(NewError(404)))
