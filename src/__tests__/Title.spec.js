import React from "react";
import ReactDOM from 'react-dom'
import Title from "../components/Title";


describe('Title component test', () => {

    it('should return progress bar', () => {
        const root = document.createElement('root');
        ReactDOM.render(
            <Title/>, root
        )
        expect(root.textContent).toEqual('simple timer');
    });

});

