import React, { Component, Fragment } from 'react';
import {Redirect} from 'react-router-dom'
import {
  Col,
  FormGroup, Label, Input
} from 'reactstrap';
import {Form} from 'reactstrap'
// import {Container} from 'reactstrap';
// import RegisterModal from './RegisterModal';

import { Avatar } from '@material-ui/core';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Spinner from './LoaderSpinner';
import bgimag from '../assets/bgimag.svg';
import stayhome from '../assets/stayhome.jpg';
import 'typeface-roboto';
import "../App.css"

const axios = require('axios');

class Login extends Component {
    constructor() {
        super()
        this.state = {
            email: '',
            password: '',
            redirect: false,
            loading:false,
        };

        this.handleSubmit = this.handleSubmit.bind(this)
        this.handleChange = this.handleChange.bind(this)
       // this.handleRegister = this.handleRegister.bind(this)
        this.useStyles = this.useStyles.bind(this)
    }

    handleSubmit() {
      this.setState({loading: true});
        let config = {
            headers: { 'Content-Type': 'application/json' },
            responseType: 'json'
          };
        
        console.log('Email: ' + this.state.email);
        console.log('Password: ' + this.state.password);

        
        axios.post(' https://esratrackcovidtest.herokuapp.com/api/users/login', {email: this.state.email, password: this.state.password}, config).then(res => {
       ///   console.log(res.data); // check in chrom terminal
          this.props.handleStateChange(res.data);         
          this.setState({redirect: true});
          if (this.setState({redirect: true})){
            alert(' Please check your Email or Password');
          }
        }).catch(err => console.error(err));

       
    }

    handleChange(event) {
        this.setState({
            [event.target.name]: event.target.value
        });
        console.log('change handled')
        
    }

    // handleRegister(registerQuery) {
    //     axios.post('/api/users/create', registerQuery)
    //     console.log('creating user...')
    // }
    
    useStyles() {
      return (makeStyles((theme) => ({
        paper: {
          marginTop: theme.spacing(8),
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        },
        avatar: {
          margin: theme.spacing(1),
          backgroundColor: theme.palette.secondary.main,
        },
        form: {
          width: '100%', // Fix IE 11 issue.
          marginTop: theme.spacing(1),
        },
        submit: {
          margin: theme.spacing(3, 0, 2),
        }
      }))
      )
    }



    render() {
        const { redirect } = this.state;
        if (redirect) {
          
          var redirictpage = this.props.userType == "admin" ? '/admin/dashboard':'/dashboard'
          console.log('redirecting');
          return <Redirect to= {redirictpage}/>;
        }
        const classes = this.useStyles();
        
        return (
      
          <Fragment>
            <div className={'BgImage'} style = {{display: 'flex',  justifyContent:'center', alignItems:'center', height: '100vh'}}>
              <Container style = {{backgroundColor: "#ffffffb3" , padding:"2rem"}} component="main" maxWidth="xs">
              <CssBaseline />
              <div className={classes.paper}>
              <Avatar style={{marginLeft:"11rem",marginBottom:"2rem"}} src="/broken-image.jpg" />
              {/* <img style={{marginLeft:"4rem"}} alt="TrackCovid" src={stayhome} title="TrackCovid" /> */}
              <Typography style={{marginLeft:"7rem",fontWeight:"bold"}} component="h1" variant="h5">
              Track Absence
              </Typography>
                <Form className="form">
                  <Col>
                    <FormGroup>
                      {/* <Input
                        type="email"
                        name="email"
                        id="email"
                        value={this.state.email}
                        onChange={this.handleChange}
                        placeholder="Enter Work Email"
                      /> */}
                      <TextField
                      variant="outlined"
                      margin="normal"
                      required
                      fullWidth
                      id="email"
                      label="Email Address"
                      name="email"
                      value={this.state.email}
                      onChange={this.handleChange}
                      autoComplete="email"
                      autoFocus
                      />
                    </FormGroup>
                  </Col>
                  <Col>
                    <FormGroup>
                      {/* <Input
                        type="password"
                        name="password"
                        id="password"
                        value={this.state.password}
                        onChange={this.handleChange}
                        placeholder="Enter Password"
                      /> */}
                      <TextField
                      variant="outlined"
                      margin="normal"
                      required
                      fullWidth
                      name="password"
                      label="Password"
                      type="password"
                      value={this.state.password}
                      onChange={this.handleChange}
                      id="password"
                      autoComplete="current-password"
                      />
                    </FormGroup>
                  </Col>
                  {/* <Button fullWidth className="btn-primary" onClick={this.handleSubmit}>Submit</Button> */}
                  <FormControlLabel
                  control={<Checkbox value="remember" color="primary" />}
                  label="Remember me"
                  />
                  <Button
                    fullWidth
                    variant="contained"
                    style={{color: "white",backgroundColor: "#343a40"}}
                    onClick={e => this.handleSubmit()}
                    className={classes.submit}
                  >
                  Sign In
                  {this.state.loading && < Spinner style={{ marginLeft: "0" }}></Spinner>}
                  </Button>
                </Form>
                

                {/* <form className={classes.form} noValidate>
                <TextField
                  variant="outlined"
                  margin="normal"
                  required
                  fullWidth
                  id="email"
                  label="Email Address"
                  name="email"
                  value={this.state.email}
                  onChange={this.handleChange}
                  autoComplete="email"
                  autoFocus
                />
                <TextField
                  variant="outlined"
                  margin="normal"
                  required
                  fullWidth
                  name="password"
                  label="Password"
                  type="password"
                  value={this.state.password}
                  onChange={this.handleChange}
                  id="password"
                  autoComplete="current-password"
                />
                <FormControlLabel
                  control={<Checkbox value="remember" color="primary" />}
                  label="Remember me"
                />
                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  color="primary"
                  onClick={this.handleSubmit}
                  className={classes.submit}
                >
                  Sign In
                </Button>
              </form> */}
              </div>
              {/* <RegisterModal handleRegister={this.handleRegister}/> */}
              </Container>
            </div>
          </Fragment>


        //   <Fragment>
        //   <div style = {{display: 'flex',  justifyContent:'center', alignItems:'center', height: '80vh'}}>
    
        //     <Container component="main" maxWidth="xs">
        //     <CssBaseline />
        //     <div className={classes.paper}>
              // <Avatar className={classes.avatar}>
              //   <LockOutlinedIcon />
              // </Avatar>
              // <Typography component="h1" variant="h5">
              //   Sign in
              // </Typography>
              // <form className={classes.form} noValidate>
              //   <TextField
              //     variant="outlined"
              //     margin="normal"
              //     required
              //     fullWidth
              //     id="email"
              //     label="Email Address"
              //     name="email"
              //     value={this.state.email}
              //     onChange={this.handleChange}
              //     autoComplete="email"
              //     autoFocus
              //   />
              //   <TextField
              //     variant="outlined"
              //     margin="normal"
              //     required
              //     fullWidth
              //     name="password"
              //     label="Password"
              //     type="password"
              //     value={this.state.password}
              //     onChange={this.handleChange}
              //     id="password"
              //     autoComplete="current-password"
              //   />
              //   <FormControlLabel
              //     control={<Checkbox value="remember" color="primary" />}
              //     label="Remember me"
              //   />
              //   <Button
              //     type="submit"
              //     fullWidth
              //     variant="contained"
              //     color="primary"
              //     onClick={this.handleSubmit}
              //     className={classes.submit}
              //   >
              //     Sign In
              //   </Button>
              // </form>
        //     </div>
        //     <RegisterModal />
        //     {/* <Box mt={8}>
        //       <Copyright />
        //     </Box> */}
        //   </Container>
        // </div>
        // </Fragment>

        
        );
    }
}

export default Login;