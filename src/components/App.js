import React from "react";
import TimeboxList from "./TimeboxList";
import EditableCurrentTimebox from "./EditableCurrentTimebox";
import Title from "./Title";
import ErrorCatcher from "./ErrorCatcher";
import styled from 'styled-components';
import LoginForm from "./LoginForm";
import AuthenticationApi from "../api/FetchAuthenticationApi";

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

    getUserEmail = () => "alice@example.com";

    handleLogout = () => {
        this.setState({
            accesToken: null,
            previosLoginAttemptFailed: false,
        })
    }

    onLoginAttempt = (credentials) => {
        AuthenticationApi.login(credentials).then(({accesToken}) =>
            this.setState({
                accesToken,
                previosLoginAttemptFailed: false,
            })
        ).catch(
            () => {
                this.setState({
                    accesToken,
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