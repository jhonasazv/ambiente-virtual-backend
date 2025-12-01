import express from 'express'
import UserAuth from '../controllers/UserAuth.mjs'//🐳se der erro pelo nome do modulo, so deixa como ta🐳
import AuthMiddleware from '../middleware/auth.mjs'
import {rateLimiterGeral, rateLimiterlogin} from '../utils/rateLimit/rateLimit.mjs'

import User from '../models/User.mjs'
import Contatos from '../models/Contatos.mjs'

const authRoute = express.Router()

authRoute.post('/login', rateLimiterlogin, UserAuth.login)

authRoute.post('/register', rateLimiterlogin, UserAuth.register)

authRoute.post('/refresh', UserAuth.refreshToken)

authRoute.get('/', async (req,res) => {

    res.send("gay")
})


authRoute.post('/createContatos', async (req,res) => {

    const {contatos} = req.body

    const data = await Contatos.createContatos(contatos)
    if (data.rowCount == 0) return res.send({error: 'no colloumn changed'})
})

authRoute.post('/contatos', async (req,res) => {

    const {usuarioId} = req.body

    const data = await Contatos.getContatos(usuarioId)
    res.send(data.rows)
})










authRoute.post('/test', async (req, res) =>{
        const contatos = [{
            nome: 'jhobas',
            usuarioId: 14
        },
        {
            nome: 'tobas',
            usuarioId: 14
        },
        {
            nome: 'carlos',
            usuarioId: 14
        }]

    const data = await Contatos.createContatos(contatos)
    //const data = await User.getAllUsers()
    res.send(data)
})

export default authRoute