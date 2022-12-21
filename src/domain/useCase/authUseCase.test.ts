import { authUsecase } from "../../protocols/useCases/authUseCase"

interface user {
    id: string;
    email: string;
    password: string;
}

interface userRepository {
    load: (email: string) => Promise<user>
}


class AuthUseCase implements authUsecase {

    constructor(private userRepository: userRepository) { }

    async auth(email: string, password: string) {

        const user = await this.userRepository.load(email)
        if (!user) throw 'User not found!'


        return {
            accessToken: '',
            user: ''
        }
    }
}


describe('Auth use case', () => {
    test('', () => {

    })
})