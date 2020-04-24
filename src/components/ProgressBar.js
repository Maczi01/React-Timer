import React from "react";


function ProgressBar({percent = 20}) {
    return (
        <div className="ProgressBar">
            <div style={{width: `${percent}%`}}></div>
        </div>
    )
}

export default ProgressBar;