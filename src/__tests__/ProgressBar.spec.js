import ProgressBar from "../components/ProgressBar";
import React from "react";
import ReactDOM from 'react-dom'
import Title from "../components/Title";

it('should return offset width equal zero', () => {
    const root = document.createElement('root');
    ReactDOM.render(
        <ProgressBar percent={100}/>, root
    )
    expect(root.offsetWidth).toEqual(0);
});

it('should return div inside progress bar', () => {
    const root = document.createElement('root');
    ReactDOM.render(
        <ProgressBar percent={100}/>, root
    )
    expect(root.childNodes[0].nodeName).toEqual("DIV");
});

