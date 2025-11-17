import express from 'express'
import UserAuth from '../controllers/UserAuth.mjs'//🐳se der erro pelo nome do modulo, so deixa como ta🐳
import AuthMiddleware from '../middleware/auth.mjs'
import {rateLimiterGeral, rateLimiterlogin} from '../utils/rateLimit/rateLimit.mjs'

const authRoute = express.Router()

authRoute.post('/login', rateLimiterlogin, UserAuth.login)

authRoute.post('/refresh', AuthMiddleware.verifyAuth, UserAuth.refreshToken)

export default authRoute