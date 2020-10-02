import { Router } from 'express'
import clientRouter from './client'

const router = new Router()

router.use('/clients', clientRouter)

export default router
