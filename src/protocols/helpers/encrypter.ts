export interface encrypter {
    genHash: (password: string) => Promise<string>
    compare: (password: string, userPassword: string) => Promise<boolean>
}