import {clientConfig} from '../database/database.mjs'
import pg from 'pg'
const {Client} = pg

class User{

    static async getClient() {

        const client = new Client(clientConfig)

        return client

    }

    static async getAllUsers() {

        const client = await User.getClient()
        
        await client.connect()
        
        const query = {
            text: "select * from segunda.usuarios"
        }
        const fetch = await client.query(query)
        await client.end()
        
        return fetch.rows 
    }

    static async getUserLogin(email, senha) {

        const client = await User.getClient()
        
        await client.connect()
        
        const query = {
            text: "select * from segunda.usuarios where email = 1$ and senha = $2",
            values: [email, senha]
        }
        const fetch = await client.query(query)
        await client.end()
        
        return fetch.rows[0]
    }

    static async getUser(email) {

        const client = await User.getClient()
        
        await client.connect()
        
        const query = {
            text: "select * from segunda.usuarios where email = 1$",
            values: [email]
        }
        const fetch = await client.query(query)
        await client.end()
        
        return fetch.rows[0]
    }

    static async createUser(nome, email, senha, token) {//NAO SEI SEVOU MANTER

        const client = await User.getClient()
        
        await client.connect()

         const query = {
            text: "insert into segunda.usuarios (nome, email, senha, refreshToken) values($1, $2, $3, $4)",
            values: [nome, email, senha, token]
        }
        const fetch = await client.query(query)
        await client.end()
        
        return fetch.rows
    }
    
}

export default User