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

    notFound(error: string) {
        return {
            statusCode: 401,
            body: error
        }
    }

    notAuthorized(error: string) {
        return {
            statusCode: 401,
            body: error
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