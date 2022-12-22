import { generateToken } from "../protocols/helpers/generateToken"

export class GenerateTokenSpy implements generateToken {
    token = 'my_token'
    generate(userId: string, secret: string) {
        return this.token
    }
}
