import { AuthUsecaseSpy } from "../../mocks/authUsecase"
import { EncrypterSpy } from "../../mocks/encrypterSpy"
import { GenerateTokenSpy } from "../../mocks/generateTokenSpy"
import { encrypter } from "../../protocols/helpers/encrypter"
import { generateToken } from "../../protocols/helpers/generateToken"
import { userRepository } from "../../protocols/repository/userRepository"
import { authUsecase } from "../../protocols/useCases/authUseCase"
import { UserRepositoryMemory } from "../../test/repository/inMemoryRepo"

class AuthUseCase implements authUsecase {

    constructor(private userRepository: userRepository, private encrypter: encrypter, private generateToken: generateToken) { }

    async auth(email: string, password: string) {

        const user = await this.userRepository.loadByEmail(email)
        if (!user) throw 'User not found!'

        const isPasswordValid = await this.encrypter.compare(user.password, password)
        if (isPasswordValid) throw 'Email/password is invalid!'
        const token = this.generateToken.generate(user.id, 'secret')
        return {
            accessToken: token,
            user: user
        }
    }
}


const makeUserRepositoryWithUser = () => {
    const userRepository = new UserRepositoryMemory()
    userRepository.create({ id: 'any_id', email: 'valid_email@email.com', name: 'any_name', password: 'valid_password' })
    return userRepository
}

const makeSut = () => {
    const userRepository = makeUserRepositoryWithUser()
    const encrypter = new EncrypterSpy()
    const generateToken = new GenerateTokenSpy()
    const authUseCase = new AuthUseCase(userRepository, encrypter, generateToken)
    return { authUseCase, encrypter }
}


describe('Auth use case', () => {
    test('Should throw if user not found!', async () => {
        const { authUseCase } = makeSut()
        const response = authUseCase.auth('invalid_email@email.com', 'valid_password')
        expect(response).rejects.toBe('User not found!')
    })

    test('Should throw if user not found!', async () => {
        const authUseCase = new AuthUsecaseSpy()
        authUseCase.user = { id: 'any_id', email: 'valid_email@email.com', name: 'any_name', password: 'valid_password' }
        const response = authUseCase.auth('valid_email@email.com', 'invalid_password')
        expect(response).rejects.toBe('Email/password is invalid!')
    })

    test('Should return an access token and user', async () => {
        const authUseCase = new AuthUsecaseSpy()
        authUseCase.user = { id: 'any_id', email: 'valid_email@email.com', name: 'any_name', password: 'valid_password' }
        const response = await authUseCase.auth('valid_email@email.com', 'valid_password')
        expect(response.accessToken).toBe('accessToken')
    })
})