import { EncrypterSpy } from "../../mocks/encrypterSpy"
import { GenerateTokenSpy } from "../../mocks/generateTokenSpy"
import { UserRepositoryMemory } from "../../test/repository/inMemoryRepo"
import { AuthUseCase } from "./authUseCase"


const userCreate = { id: 'any_id', email: 'valid_email@email.com', name: 'any_name', password: 'valid_password' }

const makeUserRepositoryWithUser = () => {
    const userRepository = new UserRepositoryMemory()
    userRepository.create(userCreate)
    return userRepository
}

const makeSut = () => {
    const userRepository = makeUserRepositoryWithUser()
    const encrypter = new EncrypterSpy()
    const generateToken = new GenerateTokenSpy()
    const authUseCase = new AuthUseCase(userRepository, encrypter, generateToken)
    return { authUseCase, encrypter, userRepository, generateToken }
}


describe('Auth use case', () => {
    test('Should throw if user not found!', async () => {
        const { authUseCase } = makeSut()
        const response = authUseCase.auth('invalid_email@email.com', 'valid_password')
        expect(response).rejects.toBe('User not found!')
    })

    test('Should throw if user not found!', async () => {
        const { authUseCase } = makeSut()
        const response = authUseCase.auth('valid_email@email.com', 'invalid_password')
        expect(response).rejects.toBe('Email/password is invalid!')
    })

    test('Should return an access token and user', async () => {
        const { encrypter, generateToken, userRepository } = makeSut()
        encrypter.isEquals = true
        const authUseCase = new AuthUseCase(userRepository, encrypter, generateToken)
        const response = await authUseCase.auth('valid_email@email.com', 'valid_password')
        expect(response.accessToken).toBe('accessToken')
        expect(response.user.email).toEqual(userCreate.email)
    })
})