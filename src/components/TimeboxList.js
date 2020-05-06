import React from 'react'
import Timebox from "./Timebox";
import TimeBoxCreator from "./TimeBoxCreator";
import ErrorCatcher from "./ErrorCatcher";

class TimeboxList extends React.Component {
    state = {
        timeboxes: [
            {
                id: "dxgcbhjk",
                title: "Zmiana koloru w css",
                totalTimeInMinutes: "10",
            }, {
                id: "dxgcbhsadasdasjk",
                title: "Wyśrodkowanie diva",
                totalTimeInMinutes: "40",
            }, {
                id: "dxgffffffcbhjk",
                title: "Wstawianie średników na końcu",
                totalTimeInMinutes: "20",
            },
        ]
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

    updateTimebox = (indexToUpdate, updatedTimebox) => {
        this.setState(prevState => {
            const timeboxes = prevState.timeboxes.map((timebox, index) =>
                index === indexToUpdate ? updatedTimebox : timebox
            )
            return {timeboxes};
        })
    };

    render() {
        return (
            <>
                <TimeBoxCreator
                    onCreate={this.handleCreate}
                />
                <ErrorCatcher message="Coś się zjebało">
                    {this.state.timeboxes.map((timebox, index) =>
                        <Timebox key={timebox.id}
                                 timebox={timebox}
                                 index={index}
                                 title={timebox.title}
                                 totalTimeInMinutes={timebox.totalTimeInMinutes}
                                 onDelete={() => this.removeTimebox(index)}
                                 onEdit={this.updateTimebox}
                        />
                    )}
                </ErrorCatcher>
            </>
        )
    }
}

export default TimeboxList;