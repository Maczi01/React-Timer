import React from "react";

class ErrorCatcher extends React.Component {

    state = {
        hasError: false
    }

    static getDerivedStateFromError(error) {
        return {hasError: true}
    }

    componentDidCatch(error, errorInfo) {
        console.log("Wystąpił błąd ", error, errorInfo)
    }

    render() {
        const {message, children} = this.props
        return (
            this.state.hasError ? message : children
        )
    }

}

export default ErrorCatcher