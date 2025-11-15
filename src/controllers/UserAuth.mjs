import AuthUtils from '../utils/auth/Auth.mjs'

class UserAuth{

    static login(req, res) {
        
        //const {name, password} = req.body

        //verificar banco


        //token de acesso
        const signature = AuthUtils.JWTtoken('1', 'test')//🐳parametros em string🐳

        //token de resgate do token de acesso
        const refresh = AuthUtils.generatorRefreshToken()//por no banco

        res.send({JWT: signature, refresh: refresh})

    }

    static async logout(req, res) {
        


    }

    static async refreshToken(req, res) {
        
        //pegando o refresh token do header
        const authHeader = req.get('Authorization')

        const refreshToken = authHeader.split(' ')
        
        refreshToken[1]//comparar com o banco de dados

        //recriar token de acesso
        const signature = AuthUtils.JWTtoken('1', 'test')//🐳parametros em string🐳

        res.send({JWT: signature})
        
    }
}

export default UserAuth