import React from "react";

function ProgressBar({percent = 20}) {
    return (
        <div className="progress">
            <div className="progress__bar" style={{width: `${percent}%`}}></div>
        </div>
    )
}

export default ProgressBar;