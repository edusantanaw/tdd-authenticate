import { AuthUseCase } from "../../domain/useCase/authUseCase";
import { EmailValidator } from "../../helpers/emailValidator";
import { Encrypter } from "../../helpers/encrypter";
import { GenerateToken } from "../../helpers/generateToken";
import { SigninController } from "../../presentational/signin.controller";
import { UserRepositoryMemory } from "../../test/repository/inMemoryRepo";

function makeAuthUseCase() {
    const userRepository = new UserRepositoryMemory()
    const encrypter = new Encrypter()
    const generateToken = new GenerateToken()
    return new AuthUseCase(userRepository, encrypter, generateToken)
}

export function UserFactory() {
    const emailValidator = new EmailValidator()
    const authUseCase = makeAuthUseCase()
    return new SigninController(emailValidator, authUseCase)
}