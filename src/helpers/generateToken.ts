import jwt from 'jsonwebtoken'
export class GenerateToken {

    generate(userId: string, key: string) {
        const token = jwt.sign(userId, key)
        return token
    }
}