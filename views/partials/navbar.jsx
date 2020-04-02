import React, { Component } from 'react';
import {Link} from 'react-router-dom';
import styled from 'styled-components';
// import hamburgericon from '../icons/hanburger.png';
// import homeicon from '../icons/home.png';
// import User from '../models/User'
// import searchicon from '../icons/search.png';

const hamburgericon = require('../icons/hamburger.png')
const homeicon = require('../icons/home.png')

export default class NavBar extends Component {
    render(){
        return (
            <NavWrapper className="navbar navbar-expand-sm bg-primary navbar-dark px-sm-5 justify-content-between">
                <Link to='/' className="navbar-nav">
                    <ButtonContainer>
                        <img src={hamburgericon} alt="HamburgerMenu" className="Navbar-brand ml-2" />
                    </ButtonContainer>
                </Link>
                <Link to='/' className="navbar-nav">
                    <ButtonContainer>
                        <img src={homeicon} alt="HomeIcon" className="Navbar-brand ml-2" />
                    </ButtonContainer>
                </Link>
            </NavWrapper>
        );
    }
}

const NavWrapper = styled.nav