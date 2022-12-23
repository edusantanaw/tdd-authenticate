import { generateToken } from "../protocols/helpers/generateToken"

export class GenerateTokenSpy implements generateToken {
    token = 'accessToken'
    generate(userId: string, secret: string) {
        return this.token
    }
}
