import jws from 'jws'

class AuthMiddleware {

    static verifyAuth(req, res, next) {//VERIFICAR PELO TEMPO EXP
        
        const authHeader = req.get('Authorization')

        const Token = authHeader.split(' ')

        const jwt = jws.decode(Token[1])

        const result = jws.verify(Token[1], jwt.header.alg, process.env.JWT_SECRET)

        if (!result) {
            return res.send({error: 'nao autorizado'})
        }
        //verificar aqui!
        //testar o req.user = blabla
        next()

    }
}

export default AuthMiddleware