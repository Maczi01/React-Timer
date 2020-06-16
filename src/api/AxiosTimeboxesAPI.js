import axios from "axios";

const BASE_URL = "http://localhost:3000/timeboxes";
// const BASE_URL = "http://localhost:8080/api/";

const AxiosTimeboxesApi = {
    getAllTimeboxes: async () => {
        const response = await axios.get(BASE_URL);
        const timeboxes = response.data;
        return timeboxes;
    },

    addNewTimebox: async (timeboxToAdd) => {
        const response = await axios.post(BASE_URL, timeboxToAdd);
        const addedTimebox = response.data
        return addedTimebox;
    },

    replaceTimebox: async (timeboxToReplace) => {
        if (!timeboxToReplace.id) {
            throw new Error("This timebox haven't id!")
        }
        const response = await axios.put(`${BASE_URL}/${timeboxToReplace.id}`, timeboxToReplace);
        const editedTimebox = response.data;
        return editedTimebox;
    },

    removeTimebox: async (timeboxToRemove) => {
        if (!timeboxToRemove.id) {
            throw new Error("This timebox haven't id!")
        }
        await axios.delete(`${BASE_URL}/${timeboxToRemove.id}`);

    }
};


export default AxiosTimeboxesApi;