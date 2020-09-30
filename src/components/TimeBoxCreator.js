import React from 'react';
import uuid from "uuid";

class TimeBoxCreator extends React.Component {
    state = {
        title: "",
        totalTimeInMinutes: ""
    }
    handleTitleChange = (e) => {
        this.setState({title: e.target.value})
    }
    handleTotalTimeInMinutesChange = (e) => {
        this.setState({totalTimeInMinutes: e.target.value})
    }
    handleSubmit = (e) => {
        e.preventDefault()
        this.props.onCreate({
            // id: uuid.v4(),
            title: this.state.title,
            totalTimeInMinutes: this.state.totalTimeInMinutes
        });
        this.setState({
            title: "",
            totalTimeInMinutes: ""
        })
    };

    render() {
        return (
            <form onSubmit={this.handleSubmit} className="TimeboxCreator">
                <label>Co robisz?
                    <input
                        value={this.state.title}
                        onChange={this.handleTitleChange}
                        type="text"/>
                </label><br/>
                <label>Ile minut?
                    <input
                        value={this.state.totalTimeInMinutes}
                        onChange={this.handleTotalTimeInMinutesChange}
                        type="number"/>
                </label><br/>
                <button>Dodaj timebox
                </button>
            </form>
        )
    }
}

export default TimeBoxCreator