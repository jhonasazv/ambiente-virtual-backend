import express from "express"
import cookieParser from "cookie-parser"
import dotenv from 'dotenv'
dotenv.config()

import routes from './src/routes/index.mjs'

const app = express()

app.use(express.urlencoded())
app.use(express.json())
//app.use(cookieParser('adaafmijanwfgi3131145palaofmaom522gdbbsdrjkoFGKAJBIfokmaow'))

app.use(routes)


app.listen(3000, () => {console.log("running...")})