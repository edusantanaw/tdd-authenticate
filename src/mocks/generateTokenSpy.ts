export class GenerateTokenSpy {
    token = 'my_token'
    generate(userId: string, secret: string) {
        return this.token
    }
}
