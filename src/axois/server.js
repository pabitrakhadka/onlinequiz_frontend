import axios from "axios"
import Cookies from "js-cookie";
class Server {
    constructor() {
        this.header = {};
        // console.log("constructor is called");
        // this.header = typeof window !== "undefined" ? this._getAuthHeader() : {};
        // console.log("initial header=", this.header);
        // this.header = {}
    }
    //Receive Tioken from 
    // _getAuthHeader() {
    //     const token = Cookies.get('accessToken');
    //     console.log("Get cookies form Browser", token);
    //     return token ? { Authorization: `Bearer${token}` } : {}
    // }

    //upate the header with the letest token form cookies
    // setAuth() {
    //     if (typeof window !== 'undefined') {
    //         this.header = this._getAuthHeader();

    //     }
    // }

    post(path, data) {
        return axios.post(path, data, {
            headers: this.header,
            withCredentials: true,
        });
    }

    get(path, data) {
        return axios.get(path, data, {
            headers: this.header,
            withCredentials: true,
        });
    }

    put(path, data) {
        return axios.put(path, data, {
            headers: this.header,
            withCredentials: true,
        });
    }

    delete(path, data) {
        return axios.delete(path, data, {
            headers: this.header,
            withCredentials: true,
        });
    }

}
export const server = new Server();