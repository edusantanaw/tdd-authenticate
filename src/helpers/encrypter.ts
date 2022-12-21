import bcrypt from 'bcrypt'

interface encrypter {
    genHash: (password: string) => Promise<string>
    compare: (password: string, userPassword: string) => Promise<boolean>
}


export class Encrypter implements encrypter {

    async genHash(password: string) {
        const salt = await bcrypt.genSalt(10)
        const hashPassword = await bcrypt.hash(password, salt)
        return hashPassword
    }

    async compare(password: string, userPassword: string) {
        const isEquals = await bcrypt.compare(password, userPassword)
        return isEquals
    }
}