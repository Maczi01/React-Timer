import React from 'react'
import EditableTimebox from "./EditableTimebox";
import TimeBoxCreator from "./TimeBoxCreator";
import ErrorCatcher from "./ErrorCatcher";

class TimeboxList extends React.Component {
    state = {
        //To powinno być one source of truth
        timeboxes: [
            {
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
            },
        ]
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

    updateTimebox = (updatedTimebox) => {
        console.log(updatedTimebox)
        this.setState(prevState => {
            const newState = {
                timeboxes: [
                    ...prevState.timeboxes.map(timebox =>
                        timebox.id === updatedTimebox.id ? updatedTimebox : timebox
                    )]
            }
            console.log("to" + newState.timeboxes)
            return newState;
        });
    }

    removeTimebox = (indexToRemove) => {
        this.setState(prevState => {
            const timeboxes = this.state.timeboxes.filter((timebox, index) =>
                index !== indexToRemove)
            return {timeboxes}
        })
    };

    addTimebox = (timebox) => {
        this.setState(prevState => {
            const timeboxes = [timebox, ...prevState.timeboxes];
            return {timeboxes};
        })
    }

    handleCreate = (createdTimebox) => {
        this.addTimebox(createdTimebox);
    }


    render() {
        console.log(this.state)
        return (
            <>
                <TimeBoxCreator
                    onCreate={this.handleCreate}
                />
                <ErrorCatcher message="Coś się popsulo">
                    {this.state.timeboxes.map((timebox, index) =>
                        <EditableTimebox key={timebox.id}
                            // id={timebox.id}
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