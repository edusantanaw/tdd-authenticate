export interface authUsecase {
    auth: (email: string, password: string) => Promise<{ accessToken: string, user: any }>
}