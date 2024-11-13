import axios from "axios"
class Server {
    constructor() {
        this.header = {}
    }
    post(path, data) {
        return axios.post(path, data, {
            headers: this.header
        })
    }
    get(path, data) {
        return axios.get(path, data, {
            headers: this.header
        })
    }
    put(path, data) {
        return axios.put(path, data, {
            headers: this.header
        })
    }
    delete(path, data) {
        return axios.delete(path, data, {
            headers: this.header
        })
    }
}
export const server = new Server();