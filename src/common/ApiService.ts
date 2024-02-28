import axios from "axios";

export default class ApiService {
    static _baseUrl = import.meta.env.VITE_API_URL;
    static instance = axios.create({
        baseURL: this._baseUrl,
    });
    static {
        if (import.meta.env.VITE_ENV_MODE === "local") {
            this.instance.interceptors.request.use(function (config) {
                const style = "color: green; font-size: 15px;";
                console.log(`%c🌈[REQUEST SUCCESS] ${config.baseURL}${config.url}\n`, style, config.data);
                return config;
            }, function (error) {
                const style = "color: red; font-size: 15px;";
                console.log(`%c🌧️[RESPONSE FAILED] ${error.response.status} ${error.response.statusText} ${error.response.data.message}\n`, style, error.request.responseURL);
                return Promise.reject(error);
            });
    
            this.instance.interceptors.response.use(function (response) {
                const style = "color: green; font-size: 15px;";
                console.log(`%c🌈[RESPONSE SUCCESS] ${response.status} ${response.statusText} ${response.request.responseURL}\n`, style, response.data);
                return response;
            }, function (error) {
                const style = "color: red; font-size: 15px;";
                console.log(`%c🌧️[RESPONSE FAILED] ${error.response.status} ${error.response.statusText} ${error.response.data.message}\n`, style, error.request.responseURL);
                return Promise.reject(error);
            });
        }
    }

    static request(method: string, path: string, params?: object) {
        if (method === "get") {
            return this.instance.get(path);
        } else if (method === "post") {
            return this.instance.post(path, params);
        } else if (method === "delete") {
            return this.instance.delete(path);
        } else if (method === "put") {
            return this.instance.put(path, params);
        } else {
            throw new Error("지원하지 않는 HTTP Method");
        }
    }
}