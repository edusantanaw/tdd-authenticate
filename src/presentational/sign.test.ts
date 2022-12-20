
class SigninController {

    async handle(email: string, password: string) {
        if (!email) return {
            statusCode: 401,
            body: { error: 'Email is required!' }
        }
        return {

        }
    }
}

describe('Signin', () => {
    test('Should throw an error if no emails is provided', async () => {
        const signiController = new SigninController()
        const response = await signiController.handle('', '')
        expect(response.statusCode).toBe(401)
        expect(response.body).toEqual({ error: 'Email is required!' })
    })
})