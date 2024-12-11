import axios from "axios";

export default class PostService2 {
    static async getAll() {
        try {
            const response = await axios.get('https://reqres.in/api/users')
            return response.data
        } catch (e) {
            console.log(e)
        }
    }
}