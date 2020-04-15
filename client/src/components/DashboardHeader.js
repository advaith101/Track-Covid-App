import React, { Component } from 'react';
import {
    Collapse, 
    Navbar, 
    NavbarToggler,
    NavbarBrand,
    Nav,
    NavItem, 
    NavLink,
    Container,
    Row
} from 'reactstrap';
import RegisterModal from './RegisterModal';
import CreateAbsenceAdmin from './CreateAbsenceAdmin';
const axios = require('axios');

class DashboardHeader extends Component {
    state = {
        isOpen: false
    }

    toggle = () => {
        this.setState({
            isOpen: !this.state.isOpen
        });
    }

    handleRegister(registerQuery) {
        axios.post('/api/users/create', registerQuery)
        console.log('creating user...')
    }

    handleCreateAbsenceAdmin(newAbsenceQuery) {
        // newAbsenceQuery.id = this.props.email;
        console.log(newAbsenceQuery);
        axios.post(`/api/absences/create`, newAbsenceQuery).then(smthg => {
            console.log("Creating absence for" + this.props.email);
            this.updateEmployeeViewModels()
        }).catch(err => console.log(err));
    }


    //TODO: Link Logout to Login page
    render() {
        return (
            <div>
                <Navbar color="dark" dark expand="sm" className="mb-5">
                    <Container>
                        <NavbarBrand href="/">{this.props.barTitle}</NavbarBrand>
                        <NavbarToggler onClick={this.toggle}/>
                     
                        <Collapse isOpen={this.state.isOpen} navbar>
                       
                            <Nav className="ml-auto" navbar>
                                <NavItem>
                                 {   (this.props.userType == "admin") &&                                 
                                <div>
                <div style={{display:'flex'}}>
                <RegisterModal handleRegister={this.handleRegister}/> 
                
                <CreateAbsenceAdmin handleCreateAbsenceAdmin={this.handleCreateAbsenceAdmin}/>
                </div>
                
                </div> }
                
    
                                </NavItem>
                                <NavItem>
                                    <NavLink href="/"> Logout </NavLink>
                                </NavItem>
                            </Nav>
                        </Collapse>
                        
                    </Container>
                </Navbar>
            </div>
        );
    }
}

export default DashboardHeader;