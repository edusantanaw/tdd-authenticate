import httpReponse from "../helpers/errors/httpReponse"
import { emailValidator } from "../protocols/helpers/emailValidator"
import { EmailValidatorSpy } from "../__mocks__/emailValidatorspy"


interface authUsecase {
    auth: (email: string, password: string) => Promise<{ accessToken: string, user: any }>
}
class AuthUsecase {
    async auth(email: string, password: string) {

        const user = ''
        if (!user) throw 'user not found'
        return {
            accessToken: 'accessToken',
            user: 'user'
        }
    }
}

class SigninController {
    constructor(private emailValidator: emailValidator, private authUsecase: authUsecase) { }

    async handle(email: string, password: string) {
        try {
            if (!email) return httpReponse.badRequest("Email is required!")
            if (!password) return httpReponse.badRequest('Password is required!')
            if (!this.emailValidator.isValid(email)) return httpReponse.badRequest('Email is invalid!')
            const { accessToken, user } = await this.authUsecase.auth(email, password)
            return {
                statusCode: 200,
                body: { accessToken, user }
            }
        } catch (error) {
            return httpReponse.catch(error)
        }
    }
}


const makeSut = () => {

    const emailValidatorSpy = new EmailValidatorSpy()
    const authUsecase = new AuthUsecase()
    const signiController = new SigninController(emailValidatorSpy, authUsecase)
    return { signiController, emailValidatorSpy, authUsecase }
}

describe('Signin', () => {
    test('Should return an error if no emails is provided', async () => {
        const { signiController } = makeSut()
        const response = await signiController.handle('', 'valid_password')
        expect(response.statusCode).toBe(400)
        expect(response.body).toEqual('Email is required!')
    })

    test('Should return an error if no password is provided', async () => {
        const { signiController } = makeSut()
        const response = await signiController.handle('valid_email@email.com', '')
        expect(response.statusCode).toBe(400)
        expect(response.body).toEqual('Password is required!')
    }
    )
    test('Should return an error if an invalid email is provided', async () => {
        const { emailValidatorSpy, authUsecase } = makeSut()
        emailValidatorSpy.isEmailValid = false
        const signiController = new SigninController(emailValidatorSpy, authUsecase)
        const response = await signiController.handle('invalid_email', 'valid_password')
        expect(response.statusCode).toBe(400)
        expect(response.body).toEqual('Email is invalid!')
    })

    test('Should throw if user not found!', () => {

    })
})