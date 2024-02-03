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
    LoginRequestBody,
    LoginOkResponseResult,

    ToastConfig,
}
