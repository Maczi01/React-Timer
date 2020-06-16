import React from "react";
import TimeboxList from "./TimeboxList";
import EditableCurrentTimebox from "./EditableCurrentTimebox";
import Title from "./Title";
import ErrorCatcher from "./ErrorCatcher";
import styled from 'styled-components';

const AppWrapper = styled.div`
  width: 80vw;
  margin: 0 auto;

`

class App extends React.Component {

    isUserLoggedIn = () => true;

    getUserEmail = () => "alice@example.com";

    handleLogout = () => console.log("logout");

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
                            <div>
                                Login form
                            </div>
                    }
                </ErrorCatcher>

            </AppWrapper>
        )
    }
}


export default App;