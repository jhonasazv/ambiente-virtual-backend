import pg from 'pg'
//const {Client} = pg

const clientConfig = {
  user: process.env.USER_DB,
  password: process.env.PASSWORD_DB,
  port: process.env.PORT_DB,
  database: process.env.DATABASE,
}

export {clientConfig}