interface LoginRequestBody {
    username: string,
    password: string,
}

interface LoginOkResponseResult {
    id: string,
    username: string,
    nickname: string,
    createdAt: string,
    updatedAt: string,
    accessToken: string,
}

export type {
    LoginRequestBody,
    LoginOkResponseResult,
}
