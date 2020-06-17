import React from 'react';
import uuid from "uuid";

class LoginForm extends React.Component {
    state = {
        email: "mati@mati.pl",
        password: "qwerty"
    }
    handleEmailChange = (e) => {
        this.setState({email: e.target.value})
    }
    handlePasswordChange = (e) => {
        this.setState({password: e.target.value})
    }
    handleSubmit = (e) => {
        e.preventDefault()
        this.props.onLoginAttempt({
            email: this.state.email,
            password: this.state.password
        });
    }


    render() {
        return (
            <form onSubmit={this.handleSubmit} className="LoginForm" autoComplete="off">
                {this.props.errorMessage ?
                    <div className="LoginForm__error--message">{this.props.errorMessage}</div>
                    : null
                }
                <label>Email
                    <input
                        value={this.state.email}
                        onChange={this.handleEmailChange}
                        type="text"/>
                </label><br/>
                <label>Hasło
                    <input
                        autoComplete="off"
                        value={this.state.password}
                        onChange={this.handlePasswordChange}
                        type="password"
                    />
                </label><br/>
                <button>Zaloguj
                </button>
            </form>
        )
    }
}

export default LoginForm