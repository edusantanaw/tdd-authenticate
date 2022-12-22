import { user } from "../protocols/entity/user"

export class AuthUsecaseSpy {
    user: user | null = null
    userPassword = 'valid_password'
    async auth(email: string, password: string) {
        this.user
        if (!this.user) throw 'User not found!'
        if (password !== this.userPassword) throw 'Password is invalid!'
        return {
            accessToken: 'accessToken',
            user: 'user'
        }
    }
}


