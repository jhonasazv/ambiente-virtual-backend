import {clientConfig} from '../database/database.mjs'
import pg from 'pg'
const {Client} = pg

class Contatos{

    static async getClient() {

        const client = new Client(clientConfig)

        return client

    }

    static async getContatos(id) {

        const client = await Contatos.getClient()

        await client.connect()

        const query = {
            text: 'select * from segunda.contatos where usuarioId = $1',
            values: [id]
        }
        const fetch = await client.query(query)
        await client.end()

        return fetch
    }

    static async createContatos(contatosCelular) {

        const contatosSobrantes = await Contatos.compararParaEnviarProDB(contatosCelular)
        
        if (contatosSobrantes.length === 0) return {error: "não e erro na verdade, mas ta igual ao db"}

        const client = await Contatos.getClient()

        await client.connect()

        const rows = contatosSobrantes.map(c => [
            c.nome ?? null,
            c.usuarioId ?? null,
            c.celularPessoal ?? null,
            c.celularTrabalho ?? null,
            c.emailPessoal ?? null,
            c.emailTrabalho ?? null,
            c.LinkedIn ?? null,
            c.Facebook ?? null,
            c.telegram ?? null,
        ])

        const query = Contatos.multiRows(rows)
        
        
        const fetch = await client.query(query)
        await client.end()

        return fetch
    }

    static async compararParaEnviarProDB(contatosCelular) {

        const contatosDB = await Contatos.getContatos(contatosCelular[0].usuarioId)

        function notMatchingByNome(arr1, arr2) {
    const set2 = new Set(arr2.map(a => a.nome))
    const result = arr1.filter(a => !set2.has(a.nome))

    return result
}

        const sobras = notMatchingByNome(contatosCelular, contatosDB.rows)
        console.log(sobras)
        return sobras
    }

    /* static async compararParaEnviarProDB(contatosCelular) {


    const client = await Contatos.getClient()

    await client.connect()

    const where = Contatos.buildOrWhere(contatosCelular)
        console.log("where = " + where)

    const query = {
        text: `select nome from segunda.contatos ${where}`,
    }
    const fetch = await client.query(query)
    await client.end()

    return fetch
        
    } */

    static multiRows(rows) {
    const values = []

    const placeholders = rows.map((row, i) => {
        const base = i * row.length

        values.push(...row)

        // create ($1, $2, $3, ...)
        const rowPlaceholders = row
            .map((_, j) => `$${base + j + 1}`)
            .join(', ')

        return `(${rowPlaceholders})`
    })

    return {
        text: `
            INSERT INTO segunda.contatos (
                nome, usuarioId, celularPessoal, celularTrabalho,
                emailPessoal, emailTrabalho, LinkedIn, Facebook, telegram
            )
            VALUES ${placeholders.join(', ')}
        `,
        values
    }
}

    /* static buildOrWhere(jsonArray) {
    if (!Array.isArray(jsonArray) || jsonArray.length === 0) {
        return { clause: "", values: [] }
    }

    const values = []
    const conditions = jsonArray.map((item, i) => {
        values.push(item.nome)
        return `nome = $${i + 1}`
    })

    return {
        clause: "WHERE " + conditions.join(" OR "),
        values
    }
} */

    
}

export default Contatos