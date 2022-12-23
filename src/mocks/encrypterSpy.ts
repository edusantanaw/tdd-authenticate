export class EncrypterSpy {
    isEquals = false
    hashedPassword = 'hashed_password'
    async compare(password: string, userPassword: string) {
        if (password === userPassword || this.isEquals === true)
            return this.isEquals = true
        return this.isEquals = false
    }

    async genHash(password: string) {
        return this.hashedPassword
    }
}