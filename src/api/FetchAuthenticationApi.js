// const BASE_URL = "http://localhost:3010/timeboxes/";
const BASE_URL = "http://localhost:3000";
const FetchAuthenticationApi = {

    login: async (credentials) => {
        const response = await makeRequest(`${BASE_URL}/login`, "POST", credentials);
        const result = await response.json();
        return result;
    }
};

const makeRequest = async (url, method, body) => {
    const jsonBody = body ? JSON.stringify(body) : undefined;
    const response = await fetch(url,
        {
            method: method,
            headers: {
                "Content-Type": "application/json",
            },
            body: jsonBody
        }
    );
    if (!response.ok) {
        throw new Error("Coś nie tak z api!")
    }
    return response;
}

export default FetchAuthenticationApi;