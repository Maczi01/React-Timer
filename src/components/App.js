import React from "react";
import TimeboxList from "./TimeboxList";
import EditableCurrentTimebox from "./EditableCurrentTimebox";
import Title from "./Title";
import ErrorCatcher from "./ErrorCatcher";
import styled from 'styled-components';

const AppWrapper = styled.div`
  width: 80vw;
  margin: 0 auto
`

const App = () => (
    <AppWrapper>
        <Title/>
        <TimeboxList/>
        <ErrorCatcher message="Coś tu nie gra">
            <EditableCurrentTimebox/>
        </ErrorCatcher>
    </AppWrapper>
);

export default App;