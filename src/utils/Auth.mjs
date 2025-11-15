import {getRandomValues} from 'node:crypto'

class AuthUtils{

    static generatorRefreshToken() {
    const arr = new Uint8Array(32);
    getRandomValues(arr);
    return [...arr].map(b => b.toString(16).padStart(2, "0")).join("");
    }
}

export default AuthUtils