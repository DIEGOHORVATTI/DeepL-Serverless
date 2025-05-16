import { Router } from 'express'

import { endpoint } from '@/middlewares'

import { authenticateUserController } from './controller'

const router = Router()

router.post('/', endpoint(authenticateUserController))

export default router
