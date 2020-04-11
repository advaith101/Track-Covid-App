import React, { Component } from 'react';
import {Redirect} from 'react-router-dom'
import {
  Container, Col, Form,
  FormGroup, Label, Input,
  Button,
} from 'reactstrap';
import RegisterModal from './RegisterModal';
const axios = require('axios');

class Login extends Component {
    constructor() {
        super()
        this.state = {
            email: '',
            password: '',
            redirect: false
        };

        this.handleSubmit = this.handleSubmit.bind(this)
        this.handleChange = this.handleChange.bind(this)
        this.handleRegister = this.handleRegister.bind(this)
    }

    handleSubmit() {
        let config = {
            headers: { 'Content-Type': 'application/json' },
            responseType: 'json'
          };
        
        console.log('Email: ' + this.state.email);
        console.log('Password: ' + this.state.password);
        
        axios.post('/api/users/login', {email: this.state.email, password: this.state.password}, config).then(res => {
          console.log(res.data); // check in chrom terminal
          this.props.handleStateChange(res.data);
          this.setState({redirect: true});
        }).catch(err => console.error(err));
    }

    handleChange(event) {
        this.setState({
            [event.target.name]: event.target.value
        });
    }

    handleRegister(registerQuery) {

    }

    render() {
        const { redirect } = this.state;
        if (redirect) {
          console.log('redirecting');
          return <Redirect to='/dashboard'/>;
        }

        return (
          <Container className="Login">
            <h2>Sign In</h2>
            <Form className="form">
              <Col>
                <FormGroup>
                  <Label>Email</Label>
                  <Input
                    type="email"
                    name="email"
                    id="email"
                    value={this.state.email}
                    onChange={this.handleChange}
                    placeholder="Enter Work Email"
                  />
                </FormGroup>
              </Col>
              <Col>
                <FormGroup>
                  <Label for="password">Password</Label>
                  <Input
                    type="password"
                    name="password"
                    id="password"
                    value={this.state.password}
                    onChange={this.handleChange}
                    placeholder="Enter Password"
                  />
                </FormGroup>
              </Col>
              <Button onClick={this.handleSubmit}>Submit</Button>
            </Form>
          <RegisterModal handleRegister={this.handleRegister}/>
          </Container>
        );
    }
}

export default Login;