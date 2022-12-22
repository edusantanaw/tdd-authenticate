import { AuthUsecaseSpy } from "../../mocks/authUsecase"
import { userRepository } from "../../protocols/repository/userRepository"
import { authUsecase } from "../../protocols/useCases/authUseCase"
import { UserRepositoryMemory } from "../../test/repository/inMemoryRepo"





class AuthUseCase implements authUsecase {

    constructor(private userRepository: userRepository) { }

    async auth(email: string, password: string) {

        const user = await this.userRepository.loadByEmail(email)
        if (!user) throw 'User not found!'


        return {
            accessToken: '',
            user: ''
        }
    }
}



const makeSut = () => {
    const userRepository = new UserRepositoryMemory()
    const authUseCase = new AuthUseCase(userRepository)
    return { authUseCase }
}


describe('Auth use case', () => {
    test('Should throw if user not found!', async () => {
        const authUseCase = new AuthUsecaseSpy()
        authUseCase.user = null
        const response = authUseCase.auth('valid_email@email.com', 'valid_password')
        expect(response).rejects.toThrow()
    })
})