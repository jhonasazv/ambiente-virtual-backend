import pg from 'pg'
//const {Client} = pg

const clientConfig = {
  user: process.env.USER_DB,
  password: process.env.PASSWORD_DB,
  port: process.env.PORT_DB,
  database: process.env.DATABASE,
}

/* USER_DB = "postgres"
PASSWORD_DB = "joao9604346"
PORT_DB = 5432
DATABASE = "segunda" */

export {clientConfig}