import React from 'react';
import Timebox from "./Timebox";
import TimeboxEditForm from "./TimeboxEditForm";

// class EditableTimebox extends React.Component {
//     state = {
//         title: this.props.title,
//         totalTimeInMinutes: this.props.totalTimeInMinutes,
//         isEditing: false,
//     }
//     // changeEdit = () => {
//     //     this.setState({
//     //         isEditing: !this.state.isEditing
//     //     })
//     // }
//     handleSubmit = (e) => {
//         e.preventDefault();
//         this.props.onEdit(this.props.index, {
//             ...this.props.timebox,
//             title: this.state.title,
//             totalTimeInMinutes: this.state.totalTimeInMinutes
//         });
//         this.setState({title: "", totalTimeInMinutes: ""})
//         // this.changeEdit()
//     }
//
//
//     handleTitleChange = e => {
//         this.setState({title: e.target.value});
//     };
//     handleTotalTimeInMinutesChange = e => {
//         this.setState({totalTimeInMinutes: e.target.value});
//     };

// const {isEditing} = this.state;

// if (totalTimeInMinutes <= 0) {
//     throw new Error("Niedobry czas!!!!")
// }


const EditableTimebox = ({title, totalTimeInMinutes, id, onDelete, updateTimebox, changeEdit, isEditing}) => {
    return (
        <div className="Timebox">
            {isEditing ?
                <TimeboxEditForm
                    id={id}
                    updateTimebox={updateTimebox}
                    changeEdit={changeEdit}
                    title={title}
                    totalTimeInMinutes={totalTimeInMinutes}
                />
                :
                <Timebox title={title} totalTimeInMinutes={totalTimeInMinutes}/>
            }
            <button onClick={onDelete}>Usun</button>
            {isEditing ?
                <button onClick={changeEdit}>Anuluj</button> :
                <button onClick={changeEdit}>Edytuj</button>
            }
        </div>
    )
}


export default EditableTimebox;