import React from "react";
import styled from 'styled-components';

const HeaderWrapper = styled.div`
  background-color: blueviolet;
  display: flex;
  text-align: center;
  justify-content: center;
  border-radius: 5px;
  border: 1px solid black;
  margin: 20px 0;
`
const Header = styled.h1`
  color: black;
`

const Title = () => (
    <HeaderWrapper>
        <Header>simple timer !</Header>
    </HeaderWrapper>
)

export default Title