import React from "react";
import TimeboxList from "./TimeboxList";
import EditableCurrentTimebox from "./EditableCurrentTimebox";
import Title from "./Title";
import ErrorCatcher from "./ErrorCatcher";

const App = () => (
    <>
        <Title/>
        <TimeboxList/>
        <ErrorCatcher message="Coś tu nie gra">
            <EditableCurrentTimebox/>
        </ErrorCatcher>
    </>
);

export default App;