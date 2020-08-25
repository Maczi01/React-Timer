import React from "react";

class TimeboxEditForm extends React.Component {
// const TimeboxEditForm = ({handleSubmit, handleTitleChange, handleTotalTimeInMinutesChange, title, totalTimeInMinutes}) => (
    //On powinien mieć swój własny stan
    //ma się nazywać timebox edit form//

    state = {
        id: this.props.id,
        title: this.props.title,
        totalTimeInMinutes: this.props.totalTimeInMinutes,
        // isEditing: this.props.isEditing
    };

    handleTitleChange = (e) => {
        this.setState({title: e.target.value})
    };
    handleTotalTimeInMinutesChange = (e) => {
        this.setState({totalTimeInMinutes: e.target.value})
    };

    handleSubmit = (e) => {
        e.preventDefault();
        this.props.updateTimebox(this.state)

    }

    render() {
        return (
            <form onSubmit={this.handleSubmit}>
                <label>
                    <input
                        value={this.state.title}
                        onChange={this.handleTitleChange}
                        type="text"
                    />
                </label>
                <label>
                    <input
                        value={this.state.totalTimeInMinutes}
                        onChange={this.handleTotalTimeInMinutesChange}
                        type="number"/>
                </label>
                <button>Zapisz stan</button>
            </form>
        )
    }
}

// )
export default TimeboxEditForm;