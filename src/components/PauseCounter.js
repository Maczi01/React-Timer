import React from "react";

function PauseCounter({pausesCount = 0}) {
    return <h2> "Liczba przerw: " {pausesCount}</h2>
}

export default PauseCounter