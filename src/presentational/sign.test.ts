
import { AuthUsecaseSpy } from "../mocks/authUsecase"
import { EmailValidatorSpy } from "../mocks/emailValidatorspy"
import { SigninController } from "./signin.controller"

const makeSut = () => {

    const emailValidatorSpy = new EmailValidatorSpy()
    const authUsecase = new AuthUsecaseSpy()
    const signiController = new SigninController(emailValidatorSpy, authUsecase)
    return { signiController, emailValidatorSpy, authUsecase }
}

describe('Signin', () => {
    test('Should return an error if no emails is provided', async () => {
        const { signiController } = makeSut()
        const response = await signiController.handle({ email: '', password: 'valid_password' })
        expect(response.statusCode).toBe(400)
        expect(response.body).toEqual('Email is required!')
    })

    test('Should return an error if no password is provided', async () => {
        const { signiController } = makeSut()
        const response = await signiController.handle({ email: 'valid_email@email.com', password: '' })
        expect(response.statusCode).toBe(400)
        expect(response.body).toEqual('Password is required!')
    }
    )
    test('Should return an error if an invalid email is provided', async () => {
        const { emailValidatorSpy, authUsecase } = makeSut()
        emailValidatorSpy.isEmailValid = false
        const signiController = new SigninController(emailValidatorSpy, authUsecase)
        const response = await signiController.handle({ email: 'invalid_email', password: 'valid_password' })
        expect(response.statusCode).toBe(400)
        expect(response.body).toEqual('Email is invalid!')
    })
    test('Should throw if user not found', async () => {
        const { signiController } = makeSut()
        const response = await signiController.handle({ email: 'any@email.com', password: 'valid_password' })
        expect(response.statusCode).toBe(400)
        expect(response.body).toBe('User not found!')
    })
    test('Should throw if an wrong password is provided', async () => {
        const { authUsecase, emailValidatorSpy } = makeSut()
        authUsecase.user = { id: 'any_id', email: 'valid_email@email.com', password: 'valid_password', name: 'any_name' }
        const signiController = new SigninController(emailValidatorSpy, authUsecase)
        const response = await signiController.handle({ email: 'valid_email@email.com', password: 'invalid_password' })
        expect(response.statusCode).toBe(400)
        expect(response.body).toBe('Email/password is invalid!')
    })

    test('Should return an access token and user if user found!', async () => {
        const { authUsecase, emailValidatorSpy } = makeSut()
        authUsecase.user = { id: 'any_id', email: 'valid_email@email.com', password: 'valid_password', name: 'any_name' }
        const signiController = new SigninController(emailValidatorSpy, authUsecase)
        const response = await signiController.handle({ email: 'valid_email@email.com', password: 'valid_password' })
        expect(response.statusCode).toBe(200)
        expect(response.body).toEqual({
            accessToken: 'accessToken',
            user: 'user'
        })
    })
})