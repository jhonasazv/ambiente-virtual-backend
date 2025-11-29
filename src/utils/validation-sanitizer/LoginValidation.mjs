import validator from "validator";

class LoginValidation {
    
    static loginSenha(input) {

        const regexSenha = /^[A-Za-z0-9!@#$%^&*()_\-+=\{\}\[\]:;"'<>,.?/\\|~]+$/
        
        let sanitized = validator.whitelist(input, regexSenha)//validator.escape(input)//tirar sem adicinar coisas loucas
        sanitized = validator.trim(sanitized)

        let validated = validator.isEmpty(sanitized)
        if (validated) return {success: false, motivo: 'senha não escrita'}
        
         validated = validator.isStrongPassword(sanitized, {
            minLength: 8,
            minLowercase: 1,
            minUppercase: 1,
            minNumbers: 2,
            minSymbols: 1,
        })
        if (!validated) return {success: false, motivo: 'senha fraca'}
        
        return {success: validated, textoValidado: sanitized}
    }

    static loginNome(input) {

    const regeNome = /^[\p{L}\p{N}][\p{L}\p{M}\p{N} '\-]*[\p{L}\p{N}]$/

        let sanitized = validator.whitelist(input, regeNome)//validator.escape(input)//tirar sem adicinar coisas loucas
        sanitized = validator.trim(sanitized)

        let validated = validator.isEmpty(sanitized)
        if (validated) return {success: false, motivo: 'nome não escrito'}

        validated = validator.isLength(sanitized, {max:35})
        if (!validated) return {success: false, motivo: 'nome muito grande'}

        return {success: validated, textoValidado: sanitized}
    }

    static loginEmail(input) {

    const regeEmail = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/

        let sanitized = validator.whitelist(input, regeEmail)//validator.escape(input)//tirar sem adicinar coisas loucas
        sanitized = validator.trim(sanitized)

        let validated = validator.contains(sanitized, '@')
        if (!validated) return {success: false, motivo: 'email invalido'}

        validated = validator.isEmpty(sanitized)
        if (validated) return {success: false, motivo: 'nome não escrito'}

        validated = validator.isLength(sanitized, {max:35})
        if (!validated) return {success: false, motivo: 'nome muito grande'}

        return {success: validated, textoValidado: sanitized}
    }
}

export default LoginValidation