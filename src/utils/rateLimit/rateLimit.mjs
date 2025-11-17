import {rateLimit} from "express-rate-limit"

//🐳configuração geral de rate limit🐳
const rateLimiterModeloGeral = {
    windowMs: 10 * 60 * 1000,
	limit: 80,
    message: { error: 'muitas requisições em pouco tempo, tente de novo depois' },
	standardHeaders: true,
	legacyHeaders: false,
	ipv6Subnet: 56,
}


const rateLimiterGeral = rateLimit(rateLimiterModeloGeral)//🐳rate limit geral🐳


const rateLimiterCustomLogin = rateLimiterModeloGeral
rateLimiterModeloGeral.windowMs = 30 * 60 * 1000
rateLimiterModeloGeral.limit = 8
rateLimiterModeloGeral.message = { error: 'muitas tentativas de login em curto tempo, tente de novo depois' }

const rateLimiterlogin = rateLimit(rateLimiterCustomLogin)//🐳rate limit para logins🐳

export {rateLimiterGeral, rateLimiterlogin}