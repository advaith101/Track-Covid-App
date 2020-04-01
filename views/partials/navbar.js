import React, { Component } from 'react';
import {Link} from 'react-router-dom';
import styled from 'styled-components';


export default class NavBar extends Component {
    render(){
        return (
            <NavWrapper className="navbar navbar-expand-sm bg-primary navbar-dark px-sm-5 justify-content-between">
                <Link to='/' className="navbar-nav">
                    <ButtonContainer>
                        <img src={home_icon} alt="WordList" className="Navbar-brand ml-2" />
                    </ButtonContainer>
                </Link>
                <Link to='/prek' className="navbar-nav">
                    <ButtonContainer>
                        <img src={list_icon} alt="WordList" className="Navbar-brand ml-2" />
                    </ButtonContainer>
                </Link>
                <Link to='/quiz' className="navbar-nav">
                    <ButtonContainer>
                        <img src={quiz_icon} alt="WordList" className="Navbar-brand ml-2" />
                    </ButtonContainer>
                </Link>
                <Link to='/' className="navbar-nav">
                    <ButtonContainer>
                        <img src={rewards_icon} alt="WordList" className="Navbar-brand ml-2" />
                    </ButtonContainer>
                </Link>
            </NavWrapper>
        );
    }
}

const NavWrapper = styled.nav