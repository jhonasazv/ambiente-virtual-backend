import AuthUtils from '../utils/auth/Auth.mjs'
import LoginValidation from '../utils/validation-sanitizer/LoginValidation.mjs'

class UserAuth{

    static login(req, res) {
        
         const {email, senha} = req.body

        const senhaValidada = LoginValidation.loginSenha(senha)
        const emailValido = LoginValidation.loginEmail(email)
        //verificar banco


        //token de acesso
        const signature = AuthUtils.JWTtoken('1', 'test')//🐳parametros em string🐳

        //token de resgate do token de acesso
        const refresh = AuthUtils.generatorRefreshToken()//por no banco
        
        //res.send({JWT: signature, refresh: refresh})
        res.send({email: emailValido, senha: senhaValidada})
    }

    static register(req, res) {
        
        const {nome, email, senha} = req.body

        const nomeValidado = LoginValidation.loginNome(nome)
        const senhaValidada = LoginValidation.loginSenha(senha)
        const emailValido = LoginValidation.loginEmail(email)
        //verificar banco


        //token de acesso
        const signature = AuthUtils.JWTtoken('1', 'test')//🐳parametros em string🐳

        //token de resgate do token de acesso
        const refresh = AuthUtils.generatorRefreshToken()//por no banco
        
        //res.send({JWT: signature, refresh: refresh})
        res.send({nome: nomeValidado, email: emailValido, senha: senhaValidada})
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