const makeRequest = async (url, method, body, accessToken) => {
    const jsonBody = body ? JSON.stringify(body) : undefined;
    const headers= {
        "Content-Type": "application/json",
    }
    if (accessToken) {
        headers["Authorization"] = `Bearer ${accessToken}`
    }

    const response = await fetch(url,
        {
            method: method,
            headers,
            body: jsonBody
        }
    );
    if (!response.ok) {
        throw new Error("Coś nie tak z api!")
    }
    return response;
};

export default makeRequest;
