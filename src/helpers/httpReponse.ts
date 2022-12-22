class HttpReponse {
    badRequest(error: string) {
        return {
            statusCode: 400,
            body: error
        }
    }
    success<T>(data: T) {
        return {
            statusCode: 200,
            body: data
        }
    }

    catch(error: unknown) {
        return {
            statusCode: 400,
            body: error
        }
    }
}

export default new HttpReponse()