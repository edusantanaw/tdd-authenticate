import crypto from 'node:crypto'
import { user } from '../../protocols/entity/user'
import { userRepository } from '../../protocols/repository/userRepository'

export class UserRepositoryMemory implements userRepository {

    public items: user[] = []

    async create(data: any) {
        const newUser = {
            id: crypto.randomUUID(),
            name: data.name,
            email: data.email,
            password: data.Password
        }
        this.items.push({
            ...newUser
        })
        return newUser
    }

    async loadByEmail(email: string) {
        const userResponse = this.items.filter((userrep) => userrep.email === email)
        return userResponse[0]
    }
}