import React from "react";
import TimeBoxEditor from "./TimeBoxEditor";
import CurrentTimebox from "./CurrentTimebox";

class EditableCurrentTimebox extends React.Component {
    state = {
        title: "Uczę się wyciągania ",
        totalTimeInMinutes: 1,
        isEditable: true,
    }
    handleTitleChange = (e) => {
        this.setState(
            {title: e.target.value}
        )
    }
    handleTotalTimeInMinutesChange = (event) => {
        this.setState(
            {totalTimeInMinutes: event.target.value}
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
                <React.StrictMode>
                    {isEditable ?
                        <TimeBoxEditor
                            isEditable={isEditable}
                            title={title}
                            totalTimeInMinutes={totalTimeInMinutes}
                            onConfirm={this.handleConfirm}
                            onTitleChange={this.handleTitleChange}
                            onTotalTimeInMinutesChange={this.handleTotalTimeInMinutesChange}
                        />
                        :
                        <CurrentTimebox
                            title={title}
                            isEditable={isEditable}
                            totalTimeInMinutes={totalTimeInMinutes}
                            onEdit={this.handleEdit}
                        />
                    }

                </React.StrictMode>
            </>

        )
    }
}

export default EditableCurrentTimebox