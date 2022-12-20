import { EmailValidatorSpy } from "../../__mocks__/emailValidatorspy";

jest.mock('validator')

describe('Email validator', () => {
    test('', () => {
        const emailValidator = new EmailValidatorSpy()
        emailValidator.isEmailValid = true
        const isValid = emailValidator.isValid('valid@email.com')
        expect(isValid).toBe(true)
    })
    test('', () => {
        const emailValidator = new EmailValidatorSpy()
        emailValidator.isEmailValid = false
        const isValid = emailValidator.isValid('invalid')
        expect(isValid).toBe(false)
    })
})