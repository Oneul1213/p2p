import type { LoginRequestBody } from "@/common/type";
import { http, HttpResponse } from "msw";

const BASE_URL = import.meta.env.VITE_API_URL;

export const handlers = [
    http.get(`${BASE_URL}/health`, () => {
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

    http.get(`${BASE_URL}/v1/posts`, ({ params }) => {
        const { page } = params; // eslint-disable-line

        return HttpResponse.json({
            "result": {
                "posts": [
                    {
                        "id": 17,
                        "authorId": 1,
                        "title": "t22",
                        "content": "s22",
                        "createdAt": "2024-01-14T05:25:47.481Z",
                        "updatedAt": "2024-01-14T05:25:47.481Z"
                    },
                    {
                        "id": 16,
                        "authorId": 1,
                        "title": "t22",
                        "content": "s22",
                        "createdAt": "2024-01-14T05:25:45.860Z",
                        "updatedAt": "2024-01-14T05:25:45.860Z"
                    },
                    {
                        "id": 15,
                        "authorId": 1,
                        "title": "t22",
                        "content": "s22",
                        "createdAt": "2024-01-14T05:24:12.519Z",
                        "updatedAt": "2024-01-14T05:24:12.519Z"
                    },
                    {
                        "id": 14,
                        "authorId": 1,
                        "title": "t22",
                        "content": "s22",
                        "createdAt": "2024-01-14T05:23:10.971Z",
                        "updatedAt": "2024-01-14T05:23:10.971Z"
                    },
                    {
                        "id": 13,
                        "authorId": 1,
                        "title": "t22",
                        "content": "s22",
                        "createdAt": "2024-01-14T05:15:21.773Z",
                        "updatedAt": "2024-01-14T05:15:21.773Z"
                    },
                    {
                        "id": 12,
                        "authorId": 1,
                        "title": "t22",
                        "content": "s22",
                        "createdAt": "2024-01-14T04:55:52.473Z",
                        "updatedAt": "2024-01-14T04:55:52.473Z"
                    },
                    {
                        "id": 11,
                        "authorId": 1,
                        "title": "t22",
                        "content": "s22",
                        "createdAt": "2024-01-14T04:47:50.860Z",
                        "updatedAt": "2024-01-14T04:47:50.860Z"
                    },
                    {
                        "id": 10,
                        "authorId": 1,
                        "title": "t22",
                        "content": "s22",
                        "createdAt": "2024-01-14T04:38:12.064Z",
                        "updatedAt": "2024-01-14T04:38:12.064Z"
                    },
                    {
                        "id": 9,
                        "authorId": 1,
                        "title": "t22",
                        "content": "s22",
                        "createdAt": "2024-01-14T04:38:11.134Z",
                        "updatedAt": "2024-01-14T04:38:11.134Z"
                    },
                    {
                        "id": 8,
                        "authorId": 1,
                        "title": "t22",
                        "content": "s22",
                        "createdAt": "2024-01-14T04:38:10.410Z",
                        "updatedAt": "2024-01-14T04:38:10.410Z"
                    }
                ],
                "nextPage": null
            }
        }, { status: 200 });
    }),
]