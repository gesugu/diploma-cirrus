import axios from "axios";

export default class PostService {
    static async getAll() {
        try {
            const response = await axios.get('https://673e00340118dbfe8609b9c3.mockapi.io/technodom/v1/techno')
            return response.data
        } catch (e) {
            console.log(e)
        }
    }
}