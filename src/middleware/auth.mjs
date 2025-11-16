import jws from 'jws'
import AuthUtils from '../utils/auth/Auth.mjs'

class AuthMiddleware {

    static verifyAuth(req, res, next) {
        //🐳puxando o token de acesso🐳
        const authHeader = req.get('Authorization')

        const Token = authHeader.split(' ')

        const jwt = jws.decode(Token[1])
        //🐳validando o token com a chave privada🐳
        const result = jws.verify(Token[1], jwt.header.alg, process.env.JWT_SECRET)

        if (!result) {
            return res.send({error: 'não autorizado'})
        }
        
        const timeNow = new Date()
        //🐳verificando o tempo do expire do token🐳
        if (jwt.payload.exp <= timeNow.getTime() / 1000) {
            return res.send({refresh: true})   
        }
        
        req.user = jwt.payload

        next()

    }
}

export default AuthMiddleware