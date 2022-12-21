import { emailValidator } from "../protocols/helpers/emailValidator"

export class EmailValidatorSpy implements emailValidator {
    isEmailValid = true
    email: string | undefined

    isValid(email: string): boolean {
        this.email = email
        return this.isEmailValid
    }
}
