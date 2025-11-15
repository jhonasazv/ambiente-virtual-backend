import jws from 'jws'
import {getRandomValues} from 'node:crypto'
import AuthUtils from '../utils/auth.mjs'

class UserAuth{

    static login(req, res) {
        
        //const {name, password} = req.body

        //verificar banco

        //add refresh no user

        const header = {
            alg: "HS256",
            typ: "JWT"
        }

        const payload = {
            id: 1,
            role: "test",
            iat: "hoje",
            exp: "amanha",
        }

        let secret = '12345'

        const signature = jws.sign({
        header: header,
        payload: payload,
        secret: process.env.JWT_SECRET,
});
        const refresh = AuthUtils.generatorRefreshToken()

        res.send({JWT: signature, refresh: refresh})

    }

    static async logout(req, res) {
        


    }

    static async refreshToken(req, res) {
        
        

    }
}

export default UserAuth