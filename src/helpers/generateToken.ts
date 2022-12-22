import jwt from 'jsonwebtoken'
import { generateToken } from '../protocols/helpers/generateToken'

export class GenerateToken implements generateToken {

    generate(userId: string, key: string) {
        const token = jwt.sign(userId, key)
        return token
    }
}