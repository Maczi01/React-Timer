import React from "react";
import TimeboxList from "./TimeboxList";
import EditableCurrentTimebox from "./EditableCurrentTimebox";
import Title from "./Title";
import ErrorCatcher from "./ErrorCatcher";
import styled from 'styled-components';
import LoginForm from "./LoginForm";

const AppWrapper = styled.div`
  width: 80vw;
  margin: 0 auto;

`

class App extends React.Component {

    isUserLoggedIn = () => false;

    getUserEmail = () => "alice@example.com";

    handleLogout = () => console.log("logout");

    onLoginAttempt = (credentials) => console.log("Zalogowano", credentials)

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
                                errorMessage="Nie udało się zalogować"
                                onLoginAttempt={this.onLoginAttempt}
                            />
                    }
                </ErrorCatcher>

            </AppWrapper>
        )
    }
}


export default App;