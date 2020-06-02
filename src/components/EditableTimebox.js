import React from 'react';
import Timebox from "./Timebox";
import TimeboxEditForm from "./TimeboxEditForm";

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