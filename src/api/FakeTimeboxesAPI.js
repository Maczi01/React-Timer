import * as uuid from "uuid";

const timeboxes = [
//     {
//     id: "dxgcbhjk",
//     title: "Zmiana koloru w css",
//     totalTimeInMinutes: "10",
//     isEditing: false
// }, {
//     id: "dxgcbhsadasdasjk",
//     title: "Wyśrodkowanie diva",
//     totalTimeInMinutes: "40",
//     isEditing: false
// }, {
//     id: "dxgffffffcbhjk",
//     title: "Wstawianie średników na końcu",
//     totalTimeInMinutes: "20",
//     isEditing: false
// }
]

const findIndexById = (id) => {
    const result = timeboxes.findIndex(timebox => timebox.id == id);
    if (result < 0) {
        throw new Error("Coś nie tak...")
    }
    return result;
}

const FakeTimeboxesApi = {
    getAllTimeboxes: async () => {
        await wait(1000);
        console.log("get", timeboxes)
        return [...timeboxes]
    },

    addNewTimebox: async (timeboxToAdd) => {
        await wait(1000);
        const addedTimebox = {...timeboxToAdd, id: uuid.v4()}
        timeboxes.push(addedTimebox);
        console.log('post', timeboxes)
        return addedTimebox;
    },

    replaceTimebox: async (timeboxToReplace) => {
        await wait(1000);
        if (!timeboxToReplace.id) {
            throw new Error("Nie mozna zastąpić elementu bez id")
        }
        const index = findIndexById(timeboxToReplace.id);
        const replacedTimebox = {...timeboxToReplace};
        timeboxes[index] = replacedTimebox;
        console.log('put', timeboxes)
        return replacedTimebox
    },
    removeTimebox: async (timeboxToRemove) => {
        await wait(1000);
        if (!timeboxToRemove.id) {
            throw new Error("Nie mozna zastąpić elementu bez id")
        }
        const index = findIndexById(timeboxToRemove.id);
        timeboxes.splice(index, 1);
        console.log('delete', timeboxes)
    }
}
const wait = (ms = 1000) => {
    return new Promise((resolve) => {
        setTimeout(resolve, ms)
    })
};

export default FakeTimeboxesApi;