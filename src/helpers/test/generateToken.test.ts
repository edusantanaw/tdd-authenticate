import { GenerateTokenSpy } from "../../mocks/generateTokenSpy"

describe('Generate token', () => {
    test('Should return a new token', () => {
        const generateToken = new GenerateTokenSpy()
        const response = generateToken.generate('userId', 'secret')
        expect(response).toEqual('my_token')
    })
})