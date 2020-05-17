import React from 'react'
import EditableTimebox from "./EditableTimebox";
import TimeBoxCreator from "./TimeBoxCreator";
import ErrorCatcher from "./ErrorCatcher";
import * as uuid from "uuid";

const timeboxes = [{
    id: "dxgcbhjk",
    title: "Zmiana koloru w css",
    totalTimeInMinutes: "10",
    isEditing: false
}, {
    id: "dxgcbhsadasdasjk",
    title: "Wyśrodkowanie diva",
    totalTimeInMinutes: "40",
    isEditing: false
}, {
    id: "dxgffffffcbhjk",
    title: "Wstawianie średników na końcu",
    totalTimeInMinutes: "20",
    isEditing: false
}]

const findIndexById = (id) => {
    const result = timeboxes.findIndex(timebox => timebox.id == id);
    if (result < 0) {
        throw new Error("Coś nie tak...")
    }
    return result;
}

const TimeboxesApi = {
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


class TimeboxList extends React.Component {
    //To powinno być one source of truth
    state = {
        timeboxes: [],
        loading: true,
        error: null,
    }

    componentDidMount() {
        TimeboxesApi.getAllTimeboxes()
            .then((timeboxes) => this.setState({timeboxes}))
            .catch(error => this.setState({error}))
            .finally(() => this.setState({loading: false}))
    }

    changeEdit = (toEdit) => {
        this.setState(prevState => {
            const newState = {
                timeboxes: [
                    ...prevState.timeboxes.map(timebox =>
                        timebox.id === toEdit.id ?
                            {
                                ...toEdit, isEditing: !toEdit.isEditing
                            } : timebox
                    )]
            }
            return newState;
        });
    };

    updateTimebox = (timeboxToUpdate) => {
        TimeboxesApi.replaceTimebox(timeboxToUpdate)
            .then((updatedTimebox) => this.setState(prevState => {
                    const newState = {
                        timeboxes: [
                            ...prevState.timeboxes.map(timebox =>
                                timebox.id === updatedTimebox.id ? updatedTimebox : timebox
                            )]
                    }
                    return newState;
                })
            );
    }

    removeTimebox = (indexToRemove) => {
        TimeboxesApi.removeTimebox(this.state.timeboxes[indexToRemove]).then(
            this.setState(prevState => {
                const timeboxes = this.state.timeboxes.filter((timebox, index) =>
                    index !== indexToRemove)
                return {timeboxes}
            })
        )
    };

    // addTimebox = (timebox) => {
    //     TimeboxesApi.addNewTimebox(timebox).then(
    //         (addedTimebox) =>
    //             this.setState(prevState => {
    //                 const timeboxes = [...prevState.timeboxes, addedTimebox];
    //                 return {timeboxes};
    //             })
    //     )
    // }

    addTimebox = (timebox) => {
        TimeboxesApi.addNewTimebox(timebox)
            .then(() => TimeboxesApi.getAllTimeboxes())
            .then((timeboxes) => this.setState({timeboxes}))
    }

    handleCreate = (createdTimebox) => {
        this.addTimebox(createdTimebox);
    }


    render() {
        // const {timeboxes} = this.state;
        return (
            <>
                <TimeBoxCreator
                    onCreate={this.handleCreate}
                />
                {this.state.loading ? "Timeboxy sie ladują" : null}
                {this.state.error ? "Błąd ładowania danych" : null}
                <ErrorCatcher message="Coś się popsulo">
                    {this.state.timeboxes.map((timebox, index) =>
                        <EditableTimebox key={timebox.id}
                                         id={timebox.id}

                                         timebox={timebox}
                                         index={index}
                                         title={timebox.title}
                                         isEditing={timebox.isEditing}
                                         totalTimeInMinutes={timebox.totalTimeInMinutes}
                                         onDelete={() => this.removeTimebox(index)}
                                         changeEdit={() => this.changeEdit(timebox)}
                                         updateTimebox={this.updateTimebox}
                        />
                    )}
                </ErrorCatcher>
            </>
        )
    }
}

export default TimeboxList;