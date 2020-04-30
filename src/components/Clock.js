import React from "react";

function Clock({minute = 0, second = 0, className = ""}) {
    return <h2 className={"Clock " + className}> Pozostało
        <span className="Clock__unit">{minute}</span>
        <span className="Clock__unit">:</span>
        <span className="Clock__unit Clock__unit--sec">{second}</span></h2>
}

export default Clock;