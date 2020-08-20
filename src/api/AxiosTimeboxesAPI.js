import axios from "axios";

// const BASE_URL = "http://localhost:3000/timeboxes";
const BASE_URL = "http://localhost:8080/api/timeboxes";


const AxiosTimeboxesApi = {

    getAllTimeboxes: async (accessToken) => {
        const response = await axios.get(BASE_URL, {
            headers: {
                "Authorization": `Bearer ${accessToken}`,
                'Access-Control-Allow-Credentials': true
            }
        });
        const timeboxes = response.data;
        return timeboxes;
    },

    addNewTimebox: async (timeboxToAdd, accessToken) => {
        const response = await axios.post(BASE_URL, timeboxToAdd, {
                headers: {
                    "Authorization": `Bearer ${accessToken}`,
                }
            },
        );
        const addedTimebox = response.data
        return addedTimebox;
    },

    replaceTimebox: async (timeboxToReplace, accessToken) => {
        if (!timeboxToReplace.id) {
            throw new Error("This timebox haven't id!")
        }
        const response = await axios.put(`${BASE_URL}/${timeboxToReplace.id}`, timeboxToReplace, {
            headers: {
                "Authorization": `Bearer ${accessToken}`,
                'Access-Control-Allow-Origin': '*'
            }
        });
        const editedTimebox = response.data;
        return editedTimebox;
    },

    removeTimebox: async (timeboxToRemove, accessToken) => {
        if (!timeboxToRemove.id) {
            throw new Error("This timebox haven't id!")
        }
        await axios.delete(`${BASE_URL}/${timeboxToRemove.id}`, {
            headers: {
                "Authorization": `Bearer ${accessToken}`,
                'Access-Control-Allow-Origin': '*'
            }
        });

    }
};


export default AxiosTimeboxesApi;