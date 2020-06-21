import axios from "axios";

const BASE_URL = "http://localhost:3000";
// const BASE_URL = "http://localhost:8080";
const AxiosAuthenticationApi = {
    login: async (credentials) => {
        const response = await axios.post(`${BASE_URL}/login`, credentials,
            {
                headers: {
                    'Access-Control-Allow-Origin': '*'
                }});
        const result = response.data
        return result;
    },
};


export default AxiosAuthenticationApi;