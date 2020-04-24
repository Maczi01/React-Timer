import React from "react";

function Clock({minute = 0, second = 0, className = ""}) {
    return <h2 className={"Clock " + className}> Pozostało {minute}:{second}</h2>
}

export default Clock;