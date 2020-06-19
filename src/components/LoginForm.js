import React from 'react';
import uuid from "uuid";

class LoginForm extends React.Component {
    state = {
        // email: "mati@mati.pl",
        // password: "qwerty"
        login: "user",
        password: "password"
    }
    handleEmailChange = (e) => {
        this.setState({login: e.target.value})
    }
    handlePasswordChange = (e) => {
        this.setState({password: e.target.value})
    }
    handleSubmit = (e) => {
        e.preventDefault()
        this.props.onLoginAttempt({
            login: this.state.login,
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
                <label>login
                    <input
                        value={this.state.login}
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