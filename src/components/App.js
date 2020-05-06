import React from "react";
import TimeboxList from "./TimeboxList";
import EditableTimebox from "./EditableTimebox";
import Title from "./Title";
import ErrorCatcher from "./ErrorCatcher";

const App = () => (
    <>
        <Title/>
        <TimeboxList/>
        <ErrorCatcher message="Coś tu nie gra">
            <EditableTimebox/>
        </ErrorCatcher>
    </>
);

export default App;