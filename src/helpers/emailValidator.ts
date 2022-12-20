import validator from 'validator'
import { emailValidator } from '../protocols/helpers/emailValidator'

export class EmailValidator implements emailValidator {
    isValid(email: string) {
        const isEmailValid = validator.isEmail(email)
        return isEmailValid
    }
}