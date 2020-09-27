import React from 'react';

const Timebox = ({title, totalTimeInMinutes}) => (
    <div>
        <h3>{title} - {totalTimeInMinutes} min</h3>
    </div>
)

export default Timebox;