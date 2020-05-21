// const BASE_URL = "http://localhost:3010/timeboxes/";
const BASE_URL = "http://localhost:8080/api/";
const FakeTimeboxesApi = {
    getAllTimeboxes: async () => {
        const response = await makeRequest(BASE_URL, "GET");
        const timeboxes = await response.json();
        return timeboxes;
    },

    addNewTimebox: async (timeboxToAdd) => {
        const response = await makeRequest(BASE_URL, "POST", timeboxToAdd);
        const addedTimebox = await response.json();
        return addedTimebox;
    },

    replaceTimebox: async (timeboxToReplace) => {
        if (!timeboxToReplace.id) {
            throw new Error("This timebox haven't id!")
        }
        const response = await makeRequest(`${BASE_URL}${timeboxToReplace.id}`, "PUT", timeboxToReplace);
        const replacedTimebox = await response.json();
        return replacedTimebox;
    },

    removeTimebox: async (timeboxToRemove) => {
        if (!timeboxToRemove.id) {
            throw new Error("This timebox haven't id!")
        }
        await makeRequest(`${BASE_URL}${timeboxToRemove.id}`, "DELETE");
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

export default FakeTimeboxesApi;