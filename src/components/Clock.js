import React from "react";
import PropTypes from 'prop-types';

function Clock({minute, second, className}) {
    return <h2 className={"Clock " + className}> Pozostało
        <span className="Clock__unit">{minute}</span>
        <span className="Clock__unit">:</span>
        <span className="Clock__unit Clock__unit--sec">{second}</span></h2>
}

Clock.propTypes = {
    minute: PropTypes.oneOfType([PropTypes.number, PropTypes.string]).isRequired,
    second: PropTypes.oneOfType([PropTypes.number, PropTypes.string]).isRequired
}

Clock.defaultProps = {
    className: ""
}

export default Clock;
