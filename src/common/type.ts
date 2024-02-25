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

// Post
interface Comment {
    id: Number,
    authorId: Number,
    content: String,
    createdAt: String,
    updatedAt: String,
}

interface Post {
    id: Number,
    authorId: Number,
    title: String,
    content: String,
    createdAt: String,
    updatedAt: String,
    comments: Array<Comment>,
}

export type {
    SignupRequestBody,

    LoginRequestBody,
    LoginOkResponseResult,

    ToastConfig,
    
    Comment,
    Post,
}
