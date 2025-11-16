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
        
        refreshToken[1]//🐳comparar com o banco de dados🐳

        const newRefreshToken = AuthUtils.generatorRefreshToken()//🐳criando um novo refresh token🐳

        newRefreshToken//🐳adicionar o refresh token no banco🐳

        //recriar token de acesso
        const signature = AuthUtils.JWTtoken('1', 'test')//🐳parametros em string(id, role)🐳

        res.send({JWT: signature, refresh: newRefreshToken})
        
    }
}

export default UserAuth