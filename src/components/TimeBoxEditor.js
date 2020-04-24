import React from 'react'


const TimeBoxEditor = (props) => {
    const {
        title,
        totalTimeInMinutes,
        isEditable,
        onTitleChange,
        onTotalTimeInMinutesChange,
        onConfirm,
    } = props;

    return (
        <div className={`TimeboxEditor ${isEditable ? "" : " inactive"}`}>
            <label>Co robisz?
                <input
                    value={title}
                    onChange={onTitleChange}
                    disabled={!isEditable}
                    type="text"/>
            </label><br/>
            <label>Ile minut?
                <input
                    value={totalTimeInMinutes}
                    onChange={onTotalTimeInMinutesChange}
                    disabled={!isEditable}
                    type="number"/>
            </label><br/>
            <button
                onClick={onConfirm}
                disabled={!isEditable}
            >Zatwierdź zmiany
            </button>
        </div>
    )
}

export default TimeBoxEditor