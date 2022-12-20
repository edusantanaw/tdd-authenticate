import { emailValidator } from "../protocols/helpers/emailValidator"


class SigninController {
    constructor(private emailValidator: emailValidator) {

    }

    async handle(email: string, password: string) {
        if (!email) return {
            statusCode: 401,
            body: { error: 'Email is required!' }
        }
        if (!password) return {
            statusCode: 401,
            body: { error: 'Password is required!' }
        }

        if (!this.emailValidator.isValid(email)) return {
            statusCode: 400,
            body: { error: 'Email is invalid!' }
        }

        return {

        }
    }
}

class EmailValidatorSpy {
    isValid(email: string) {
        return true
    }
}

const makeSut = () => {
    const emailValidatorSpy = new EmailValidatorSpy()
    const signiController = new SigninController(emailValidatorSpy)
    return { signiController }
}

describe('Signin', () => {
    test('Should throw an error if no emails is provided', async () => {

        const { signiController } = makeSut()
        const response = await signiController.handle('', '')
        expect(response.statusCode).toBe(401)
        expect(response.body).toEqual({ error: 'Email is required!' })
    })

    test('Should throw an error if no password is provided', async () => {
        const { signiController } = makeSut()
        const response = await signiController.handle('valid_email@email.com', '')
        expect(response.statusCode).toBe(401)
        expect(response.body).toEqual({ error: 'Password is required!' })
    })
})