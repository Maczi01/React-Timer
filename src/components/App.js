import React from "react";
import TimeboxList from "./TimeboxList";
import EditableCurrentTimebox from "./EditableCurrentTimebox";
import Title from "./Title";
import ErrorCatcher from "./ErrorCatcher";
import styled from 'styled-components';
import LoginForm from "./LoginForm";
import AuthenticationApi from "../api/AxiosAuthenticationApi";
import jwt from 'jsonwebtoken';

const AppWrapper = styled.div`
  width: 80vw;
  margin: 0 auto;

`

class App extends React.Component {

    state = {
        accessToken: null,
        previosLoginAttemptFailed: false,
    }

    isUserLoggedIn = () => !!this.state.accessToken;

    getUserEmail = () => {
        const decoded = jwt.decode(this.state.accessToken);
        return decoded.email;
    }


    handleLogout = () => {
        this.setState({
            accesToken: null,
            previosLoginAttemptFailed: false,
        })
    }

    onLoginAttempt = (credentials) => {
        AuthenticationApi.login(credentials).then(({accessToken}) =>
            this.setState({
                accessToken,
                previosLoginAttemptFailed: false,
            })
        ).catch(
            () => {
                this.setState({
                    previosLoginAttemptFailed: true,
                })
            }
        )
    }

    render() {
        return (
            <AppWrapper>
                <ErrorCatcher message="Coś tu nie gra">
                    {
                        this.isUserLoggedIn() ?
                            <>
                                <header className="header">
                                    <Title/>
                                    Witaj {this.getUserEmail()}
                                    <a onClick={this.handleLogout} className="header__logout--link"
                                       href="#"> Wyloguj</a>
                                    <TimeboxList/>
                                    <EditableCurrentTimebox/>
                                </header>
                            </>
                            :
                            <LoginForm
                                errorMessage={this.state.previosLoginAttemptFailed ? "Nie udało się zalogować" : null}
                                onLoginAttempt={this.onLoginAttempt}
                            />
                    }
                </ErrorCatcher>

            </AppWrapper>
        )
    }
}


export default App;