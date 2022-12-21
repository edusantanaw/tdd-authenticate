class HttpReponse {
    badRequest(error: string) {
        return {
            statusCode: 400,
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