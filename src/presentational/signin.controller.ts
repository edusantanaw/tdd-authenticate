import httpReponse from "../helpers/httpReponse"
import { emailValidator } from "../protocols/helpers/emailValidator"
import { authUsecase } from "../protocols/useCases/authUseCase"


export class SigninController {
    constructor(private emailValidator: emailValidator, private authUsecase: authUsecase) { }

    async handle(email: string, password: string) {
        try {
            if (!email) return httpReponse.badRequest("Email is required!")
            if (!password) return httpReponse.badRequest('Password is required!')
            if (!this.emailValidator.isValid(email)) return httpReponse.badRequest('Email is invalid!')
            const { accessToken, user } = await this.authUsecase.auth(email, password)
            return httpReponse.success({
                accessToken,
                user
            })
        } catch (error) {
            return httpReponse.catch(error)
        }
    }
}