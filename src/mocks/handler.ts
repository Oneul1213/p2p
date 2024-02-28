import type { SignupRequestBody,  LoginRequestBody, SavePostRequestBody, CommentRequestBody } from "@/common/type";
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
                    "id": 99,
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
    http.get(url("/v1/posts/:page"), ({ params }) => {
        // TODO : Pagenation이랑 연결해서 페이지 하나씩만 요청
        const { page } = params;
        console.log("전송된 page? ", page);

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
    http.get(url("/v1/post/:postId"), ({ params }) => {
        // TODO : params 체크
        const { postId } = params;
        console.log("전송된 postId? ", postId);

        // postId === 1일 경우
        return HttpResponse.json({
            "result": {
                "id": postId !== undefined ? postId : 17,
                "authorId": 1,
                "title": "t22",
                "content": "s22",
                "createdAt": "2024-01-14T05:25:47.481Z",
                "updatedAt": "2024-01-14T05:25:47.481Z",
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
    // save post
    http.post<any, SavePostRequestBody>(url("/v1/post"), async ({ request }) => {
        const requestBody = await request.json();

        if (requestBody.title.length < 2 || 30 < requestBody.title.length) {
            return HttpResponse.json({
                "message": "입력 값이 유효하지 않습니다.",
                "errors": [
                    { "title": "제목은 2~30자여야 합니다." },
                ],
            }, { status: 400, statusText: "INVALID_PARAMETER" });
        } else if (requestBody.content.length < 2 || 2000 < requestBody.content.length) {
            return HttpResponse.json({
                "message": "입력 값이 유효하지 않습니다.",
                "errors": [
                    { "content": "내용은 2~2000자여야 합니다." },
                ],
            }, { status: 400, statusText: "INVALID_PARAMETER" });
        } else {
            return HttpResponse.json({
                // 실제에선 수정/저장된 결과 값 반환
                "result": {
                    "id": requestBody.id ? requestBody.id : Math.random(),
                    "authorId": requestBody.authorId,
                    "title": requestBody.title,
                    "content": requestBody.content,
                    "createdAt": "2024-01-14T08:39:53.582Z",
                    "updatedAt": "2024-01-14T08:43:54.032Z"
                }
            }, { status: 200 });
        }
    }),
    /**
     * ========== comment ==========
     */
    // create comment
    http.post<any, CommentRequestBody>(url("/v1/posts/:postId/comment"), async ({ params, request }) => {
        const { postId } = params;
        const { authorId, content } = await request.json();

        if (2 <= content.length && content.length <= 200) {
            return HttpResponse.json({
                "result": {
                    "id": 14,
                    "authorId": authorId,
                    "postId": postId,
                    "content": content,
                    "createdAt": "2024-01-14T11:41:13.173Z",
                    "updatedAt": "2024-01-14T11:41:13.173Z"
                }
            }, { status: 200 });
        } else {
            return HttpResponse.json({
                "message": "입력 값이 유효하지 않습니다.",
                "errors": [
                    {
                        "content": "내용은 2~200자여야 합니다."
                    }
                ]
            }, { status: 400, statusText: "INVALID_PARAMETER" });
        }
    }),
    // delete comment
    http.delete(url("/v1/comments/:commentId"), ({ params }) => {
        const { commentId } = params;   // eslint-disable-line

        return HttpResponse.json({
            "message": "댓글이 정상적으로 삭제되었습니다."
        }, { status: 200 })
    }),
    // update comment
    http.put<any, CommentRequestBody>(url("/v1/comments/:commentId"), async ({ params: { commnetId }, request }) => {
        const { authorId, postId, content } = await request.json();

        return HttpResponse.json({
            "result": {
                "id": commnetId,
                "authorId": authorId,
                "postId": postId,
                "content": content,
                "createdAt": "2024-01-15T05:47:18.694Z",
                "updatedAt": "2024-01-15T05:47:24.768Z"
            }
        }, { status: 200 });
    }),
]