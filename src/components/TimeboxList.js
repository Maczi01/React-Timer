import React from 'react'
import EditableTimebox from "./EditableTimebox";
import TimeBoxCreator from "./TimeBoxCreator";
import ErrorCatcher from "./ErrorCatcher";
import TimeboxesApi from '../api/AxiosTimeboxesAPI'
import styled from 'styled-components';

class TimeboxList extends React.Component {
    //To powinno być one source of truth
    state = {
        timeboxes: [],
        loading: true,
        error: null,
    }

    componentDidMount() {
        TimeboxesApi.getAllTimeboxes(this.props.accessToken)
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
        TimeboxesApi.replaceTimebox(timeboxToUpdate, this.props.accessToken)
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
        TimeboxesApi.removeTimebox(this.state.timeboxes[indexToRemove], this.props.accessToken).then(
            this.setState(prevState => {
                const timeboxes = this.state.timeboxes.filter((timebox, index) =>
                    index !== indexToRemove)
                return {timeboxes}
            })
        )
    };

    addTimebox = (timebox) => {
        TimeboxesApi.addNewTimebox(timebox, this.props.accessToken)
            .then(() => TimeboxesApi.getAllTimeboxes(this.props.accessToken))
            .then((timeboxes) => this.setState({timeboxes}))
    }

    handleCreate = (createdTimebox) => {
        this.addTimebox(createdTimebox);
    }

    render() {
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