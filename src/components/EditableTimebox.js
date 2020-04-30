import React from "react";
import TimeBoxEditor from "./TimeBoxEditor";
import Title from "./Title";
import CurrentTimebox from "./CurrentTimebox";

class EditableTimebox extends React.Component {
    state = {
        title: "Uczę się wyciągania stanu w górę",
        totalTimeInMinutes: 1,
        isEditable: true,
    }
    handleTitleChange = (e) => {
        this.setState(
            {title: e.target.value}
        )
    }
    handleTotalTimeInMinutesChange = (e) => {
        this.setState(
            {totalTimeInMinutes: e.target.value}
        )
    }
    handleConfirm = () => {
        this.setState(
            {isEditable: false}
        )
    }
    handleEdit = () => {
        this.setState(
            {isEditable: true}
        )
    }

    render() {
        const {title, totalTimeInMinutes, isEditable} = this.state
        return (
            <>
                <TimeBoxEditor
                    isEditable={isEditable}
                    title={title}
                    totalTimeInMinutes={totalTimeInMinutes}
                    onConfirm={this.handleConfirm}
                    onTitleChange={this.handleTitleChange}
                    onTotalTimeInMinutesChange={this.handleTotalTimeInMinutesChange}
                />
                <CurrentTimebox
                    title={title}
                    isEditable={isEditable}
                    totalTimeInMinutes={totalTimeInMinutes}
                    onEdit={this.handleEdit}
                />
            </>
        )
    }
}
 export default EditableTimebox