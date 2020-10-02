import { Router } from 'express'
import clientRouter from './routes_client'

const router = new Router()

router.use('/clients', clientRouter)

export default router
