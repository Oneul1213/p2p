import type { SignupRequestBody,  LoginRequestBody } from "@/common/type";
import { http, HttpResponse } from "msw";
import { usernames, nicknames } from "@/constant/sample";

const BASE_URL = import.meta.env.VITE_API_URL;
const url = (url: string) => `${BASE_URL}${url}`;

export const handlers = [
    http.get(`${BASE_URL}/health`, () => {
        console.log("Captured a 'GET /health' request");
    }),

    /**
     * ========== auth ==========
     */
    // signup
    http.post<any, SignupRequestBody>(url("/v1/auth/signup"), async ({ request }) => {
        const requestBody = await request.json();

        if (usernames.includes(requestBody.username)) {
            return HttpResponse.json({ "message": "중복된 아이디가 존재합니다." }, { status: 400, statusText: "DUPLICATE_USERNAME" });
        }
        if (nicknames.includes(requestBody.nickname)) {
            return HttpResponse.json({ "message": "중복된 닉네임이 존재합니다." }, { status: 400, statusText: "DUPLICATE_NICKNAME" });
        }

        return HttpResponse.json({ "message": "회원가입에 성공하였습니다." }, { status: 201 });
    }),

    // login
    http.post<any, LoginRequestBody>(url("/v1/auth/login"), async ({ request }) => {
        const requestBody = await request.json();

        // TODO : 로그인 jwt 기반 구현으로 변경
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
        } else if (requestBody.username === "test2@naver.com"
        && requestBody.password !== "souf@2113") {
            return HttpResponse.json({ "message": "비밀번호가 일치하지 않습니다." },{ status: 400, statusText: "NOT_MATCH_PASSWORD" });
        } else {
            return HttpResponse.json({ "message": "로그인 오류" }, { status: 500, statusText: "LOGIN_ERROR" });
        }
    }),

    /**
     * ========== post ==========
     */
    // posts
    http.get(url("/v1/posts"), ({ params }) => {
        // TODO : Pagenation이랑 연결해서 페이지 하나씩만 요청
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
                    },
                    {
                        "id": 7,
                        "authorId": 1,
                        "title": "t22",
                        "content": "s22",
                        "createdAt": "2024-01-14T04:38:10.410Z",
                        "updatedAt": "2024-01-14T04:38:10.410Z"
                    },
                    {
                        "id": 6,
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
    // get post
    http.get(url("/v1/post"), ({ params }) => {
        // TODO : params 체크
        const pageId = params;  // eslint-disable-line
        console.log("전송된  pageId: ", pageId);

        // postId === 1일 경우
        return HttpResponse.json({
            "result": {
                "id": 1,
                "authorId": 1,
                "title": "t22",
                "content": "s22",
                "createdAt": "2024-01-15T05:07:14.115Z",
                "updatedAt": "2024-01-15T05:07:14.115Z",
                "comments": [
                    {
                        "id": 6,
                        "authorId": 1,
                        "content": "hii",
                        "createdAt": "2024-01-15T05:08:14.289Z",
                        "updatedAt": "2024-01-15T05:08:14.289Z"
                    },
                    {
                        "id": 5,
                        "authorId": 1,
                        "content": "hii",
                        "createdAt": "2024-01-15T05:08:13.023Z",
                        "updatedAt": "2024-01-15T05:08:13.023Z"
                    },
                    {
                        "id": 4,
                        "authorId": 1,
                        "content": "hii",
                        "createdAt": "2024-01-15T05:08:12.027Z",
                        "updatedAt": "2024-01-15T05:08:12.027Z"
                    },
                    {
                        "id": 3,
                        "authorId": 1,
                        "content": "hii",
                        "createdAt": "2024-01-15T05:07:24.739Z",
                        "updatedAt": "2024-01-15T05:07:24.739Z"
                    }
                ]
            }
        }, { status: 200 })
    }),
]