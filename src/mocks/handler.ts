import type { LoginRequestBody } from "@/common/type";
import { http, HttpResponse } from "msw";

const BASE_URL = import.meta.env.VITE_API_URL;

export const handlers = [
    http.get("/health", () => {
        console.log("Captured a 'GET /health' request");
    }),

    http.post<any, LoginRequestBody>(`${BASE_URL}/v1/auth/login`, async ({ request }) => {
        const requestBody = await request.json();

        if (requestBody.username === "test2@naver.com"
        && requestBody.password === "souf@2113") {
            return HttpResponse.json({
                "result": {
                    "id": 1,
                    "username": "test2@naver.com",
                    "nickname": "soo22",
                    "createdAt": "2024-01-14T04:37:37.672Z",
                    "updatedAt": "2024-01-14T04:37:37.672Z",
                    "accessToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwidXNlcm5hbWUiOiJ0ZXN0MkBuYXZlci5jb20iLCJpYXQiOjE3MDUzMjY2MjUsImV4cCI6MTcwNTMzMDIyNX0.vXTLfaYvdfPINPkLyN4kXOwvLyOaLj2xmSytUK93vVY"
                }
            },
            { status: 200 });
        } else if (requestBody.password !== "souf@2113") {
            return HttpResponse.json({ "message": "비밀번호가 일치하지 않습니다." },{ status: 401, statusText: "NOT_MATCH_PASSWORD" });
        } else {
            return HttpResponse.json({ "message": "로그인 오류" }, { status: 500, statusText: "LOGIN_ERROR" });
        }
    }),
]