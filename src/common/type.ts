// signup
interface SignupRequestBody {
    username: string,
    nickname: string,
    password: string,
}

// Login
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

// Toast
interface ToastConfig {
    severity: "success" | "info" | "warn" | "error",
    summary: string,
    detail: string,
    life: number,
}

export type {
    SignupRequestBody,

    LoginRequestBody,
    LoginOkResponseResult,

    ToastConfig,
}
