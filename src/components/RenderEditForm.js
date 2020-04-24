import React from "react";

const RenderEditForm = ({handleSubmit, handleTitleChange, handleTotalTimeInMinutesChange, title, totalTimeInMinutes}) => (
    <form onSubmit={handleSubmit}>
        <label>
            <input
                value={title}
                onChange={handleTitleChange}
                type="text"
            />
        </label>
        <label>
            <input
                value={totalTimeInMinutes}
                onChange={handleTotalTimeInMinutesChange}
                type="number"/>
        </label>
        <button>Zapisz</button>
    </form>
);

export default RenderEditForm;