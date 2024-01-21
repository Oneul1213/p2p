import axios from "axios";


export default class ApiService {
    static _baseUrl = import.meta.env.VITE_API_URL;

    static request(method: string, path: string, params?: object) {
        if (method === "get") {
            return axios.get(`${this._baseUrl}/${path}`);
        } else if (method === "post") {
            return axios.post(path, params);
        } else {
            throw new Error("존재하지 않는 HTTP Method");
        }
    }
}