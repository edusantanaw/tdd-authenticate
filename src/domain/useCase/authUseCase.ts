import { encrypter } from "../../protocols/helpers/encrypter"
import { generateToken } from "../../protocols/helpers/generateToken"
import { userRepository } from "../../protocols/repository/userRepository"
import { authUsecase } from "../../protocols/useCases/authUseCase"

export class AuthUseCase implements authUsecase {

    constructor(private userRepository: userRepository, private encrypter: encrypter, private generateToken: generateToken) { }

    async auth(email: string, password: string) {

        const user = await this.userRepository.loadByEmail(email)
        if (!user) throw 'User not found!'

        const isPasswordValid = await this.encrypter.compare(user.password, password)
        if (!isPasswordValid) throw 'Email/password is invalid!'

        const token = this.generateToken.generate(user.id, 'secret')
        return {
            accessToken: token,
            user: user
        }
    }
}
