import React from 'react';
import RenderTitleAndTime from "./RenderTitleAndTime";
import RenderEditForm from "./RenderEditForm";
class Timebox extends React.Component {
    state = {
        title: this.props.title,
        totalTimeInMinutes: this.props.totalTimeInMinutes,
        isEditing: false,
    }
    changeEdit = () => {
        this.setState({
            isEditing: !this.state.isEditing
        })
    }

    handleSubmit = (e) => {
        e.preventDefault();
        this.props.onEdit(this.props.index, {
            ...this.props.timebox,
            title: this.state.title,
            totalTimeInMinutes: this.state.totalTimeInMinutes
        });
        this.setState({title: "", totalTimeInMinutes: ""})
        this.changeEdit()
    }
    handleTitleChange = e => {
        this.setState({title: e.target.value});
    };
    handleTotalTimeInMinutesChange = e => {
        this.setState({totalTimeInMinutes: e.target.value});
    };

    render() {
        const {title, totalTimeInMinutes, onDelete} = this.props;
        const {isEditing} = this.state;
        return (
            <div className="Timebox">
                {isEditing ?
                    <RenderEditForm
                        handleSubmit={this.handleSubmit}
                        handleTitleChange={this.handleTitleChange}
                        handleTotalTimeInMinutesChange={this.handleTotalTimeInMinutesChange}
                        title={this.state.title}
                        totalTimeInMinutes={this.state.totalTimeInMinutes}
                    />
                    :
                    <RenderTitleAndTime title={title} totalTimeInMinutes={totalTimeInMinutes}/>
                }
                <button onClick={onDelete}>Usun</button>
                {isEditing ?
                    <button onClick={this.changeEdit}>Anuluj</button> :
                    <button onClick={this.changeEdit}>Edytuj</button>
                }
            </div>
        )
    }
}

export default Timebox;