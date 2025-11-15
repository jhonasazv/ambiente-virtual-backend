import express from 'express'
import UserAuth from '../controllers/UserAuth.mjs'

const authRoute = express.Router()

authRoute.get('/login', UserAuth.login)

export default authRoute