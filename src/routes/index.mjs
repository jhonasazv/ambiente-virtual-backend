import express from 'express'
import authRoute from './auth.mjs'

const routes = express.Router()

routes.use(authRoute)

export default routes