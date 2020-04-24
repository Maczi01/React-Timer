import React from 'react';

const RenderTitleAndTime = ({title, totalTimeInMinutes}) => (
    <div>
        <h3>{title} - {totalTimeInMinutes} min</h3>
    </div>
)

export default RenderTitleAndTime;