import makeRequest from "./MakeFetchRequest";
const BASE_URL = "http://localhost:3000/timeboxes/";
// const BASE_URL = "http://localhost:8080/api/";
const FakeTimeboxesApi = {
    getAllTimeboxes: async (accessToken) => {
        const response = await makeRequest(BASE_URL, "GET", null, accessToken);
        const timeboxes = await response.json();
        return timeboxes;
    },

    addNewTimebox: async (timeboxToAdd, accessToken) => {
        const response = await makeRequest(BASE_URL, "POST", timeboxToAdd, accessToken);
        const addedTimebox = await response.json();
        return addedTimebox;
    },

    replaceTimebox: async (timeboxToReplace, accessToken) => {
        if (!timeboxToReplace.id) {
            throw new Error("This timebox haven't id!")
        }
        const response = await makeRequest(`${BASE_URL}${timeboxToReplace.id}`, "PUT", timeboxToReplace, accessToken);
        const replacedTimebox = await response.json();
        return replacedTimebox;
    },

    removeTimebox: async (timeboxToRemove, accessToken) => {
        if (!timeboxToRemove.id) {
            throw new Error("This timebox haven't id!")
        }
        await makeRequest(`${BASE_URL}${timeboxToRemove.id}`, "DELETE", null, accessToken);
    }
};


export default FakeTimeboxesApi;