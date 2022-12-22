import { EncrypterSpy } from "../../mocks/encrypterSpy"


describe('Encrypter', () => {
    test('should return false if password dont match', async () => {
        const encrypter = new EncrypterSpy()
        const response = await encrypter.compare('pass', 'passDont')
        expect(response).toBe(false)
    })
    test('should return true if password  match', async () => {
        const encrypter = new EncrypterSpy()
        const response = await encrypter.compare('pass', 'pass')
        expect(response).toBe(true)
    })

    test('Should return an encrypter string', async () => {
        const encrypter = new EncrypterSpy()
        const response = await encrypter.genHash('pass')
        expect(response).toBe('hashed_password')
    })
})