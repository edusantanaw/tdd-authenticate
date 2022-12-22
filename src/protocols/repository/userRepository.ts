import { user } from "../entity/user";

export interface userRepository {
    create: (data: { email: string, password: string, name: string }) => Promise<user>
    loadByEmail: (email: string) => Promise<user>
}