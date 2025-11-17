import express from "express"
import cookieParser from "cookie-parser"
import dotenv from 'dotenv'
import routes from './src/routes/index.mjs'
import {rateLimiterGeral, rateLimiterlogin} from './src/utils/rateLimit/rateLimit.mjs'

dotenv.config()

const app = express()

app.use(express.urlencoded())
app.use(express.json())
//app.use(cookieParser('adaafmijanwfgi3131145palaofmaom522gdbbsdrjkoFGKAJBIfokmaow'))

app.use(routes)


app.listen(3000, () => {console.log(rateLimiterGeral)})