import { EmailValidatorSpy } from "../../mocks/emailValidatorspy";

jest.mock('validator')

describe('Email validator', () => {
    test('Should return true if an valid email is provided', () => {
        const emailValidator = new EmailValidatorSpy()
        emailValidator.isEmailValid = true
        const isValid = emailValidator.isValid('valid@email.com')
        expect(isValid).toBe(true)
    })

    test('Should return true if an invalid email is provided', () => {
        const emailValidator = new EmailValidatorSpy()
        emailValidator.isEmailValid = false
        const isValid = emailValidator.isValid('invalid')
        expect(isValid).toBe(false)
    })
})