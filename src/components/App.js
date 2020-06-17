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
        previousLoginAttemptFailed: false,
    }

    isUserLoggedIn = () => !!this.state.accessToken;

    getUserEmail = () => {
        const decoded = jwt.decode(this.state.accessToken);
        return decoded.email;
    }

    componentDidMount() {
        const currentAccessToken = localStorage.getItem("accessToken");
        this.setState({
            accessToken: currentAccessToken
        })
    }

    startCounting = () => {
        let time = 10;
        setInterval(() => {
                time--
                console.log(time)
                if (time <= 0) {
                    this.setState({accessToken: null})
                }
            }
            , 1000)
    };

    onLoginAttempt = (credentials) => {
        AuthenticationApi.login(credentials).then(({accessToken}) => {
                this.setState({
                    accessToken,
                    previousLoginAttemptFailed: false,
                })
                // localStorage.setItem("accessToken", accessToken)
                // this.startCounting();
            // const decoded = jwt.decode(this.state.accessToken);
            //     console.log(new Date(decoded.iat*1000))
            }
        ).catch(
            () => {
                this.setState({
                    previousLoginAttemptFailed: true,
                })
            }
        )
    }

    handleLogout = () => {
        this.setState({
            accessToken: null,
            previousLoginAttemptFailed: false,
        });
        localStorage.removeItem("accessToken");
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
                                    <TimeboxList accessToken={this.state.accessToken}/>
                                    <EditableCurrentTimebox/>
                                </header>
                            </>
                            :
                            <LoginForm
                                errorMessage={this.state.previousLoginAttemptFailed ? "Nie udało się zalogować" : null}
                                onLoginAttempt={this.onLoginAttempt}
                            />
                    }
                </ErrorCatcher>

            </AppWrapper>
        )
    }
}


export default App;