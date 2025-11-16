import {getRandomValues} from 'node:crypto'
import jws from 'jws'

class AuthUtils{

    static generatorRefreshToken() {
    const arr = new Uint8Array(32);
    getRandomValues(arr);
    return [...arr].map(b => b.toString(16).padStart(2, "0")).join("");
    }
    
    static JWTtime() {

        const dateNow = new Date()
        const dateFuture = new Date()

        dateFuture.setTime(dateNow.getTime() + 10 * 60 * 1000)

        const dateIOT = dateNow.getTime()
        const dateEXP = dateFuture.getTime()

        return ({IOT: dateIOT / 1000, EXP: dateEXP / 1000})

    }

    //gerador do token JWT para autenticacao
    //header, payload e signature compoe o JWT(token)
    static JWTtoken(id, role) {

        const header = {
            alg: "HS256",
            typ: "JWT"
        }

        const date = AuthUtils.JWTtime()
        const payload = {
            id: id,
            role: role,
            iat: date.IOT,
            exp: date.EXP,
        }

        const signature = jws.sign({
            header: header,
            payload: payload,
            secret: process.env.JWT_SECRET,
        });        

        return signature
    }
}

export default AuthUtils