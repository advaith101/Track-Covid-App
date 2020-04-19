import React, { Component, Fragment } from 'react';
import { Redirect } from 'react-router-dom'
import {
  Col,
  FormGroup
} from 'reactstrap';
import { Form } from 'reactstrap';
import Grid from '@material-ui/core/Grid';
import { Provider as AlertProvider, withAlert } from "react-alert";
import { Avatar } from '@material-ui/core';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import 'typeface-roboto';
import "../App.css";
import EsraLogo from '../assets/EsraLogo.ico';

var sha512 = require('js-sha512');

class Login extends Component {
  constructor(props) {
    super(props)
    this.state = {
      email: '',
      password: '',
      redirect: false,
      loading: false,
    };

    this.handleSubmit = this.handleSubmit.bind(this)
    this.handleChange = this.handleChange.bind(this)
    this.useStyles = this.useStyles.bind(this)
  }



  handleSubmit() {

    fetch(this.props.url+"users/validatelogin", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ email: this.state.email, password: sha512(this.state.password) })
    })
      .then(res => res.json())
      .then(res => {
        if (res.status == "ok") {
          this.props.handleStateChange(res.user, this.state.email);
          window.localStorage.setItem("CompanyID", res.user.CompanyID)
          window.localStorage.setItem("refresh_token", res.refreshToken)
          window.localStorage.setItem("bearer_token", res.token)
          window.localStorage.setItem("isAdmin", res.user.IsAdmin);
          window.localStorage.setItem("name", res.user.UserName);
          window.localStorage.setItem("userId", res.user.UserID);
          window.localStorage.setItem("email", this.state.email);


          this.setState({ redirect: true });
        }
        else {
          this.props.alert.show("Check your credentials")
        }
      }
      )
  }


  handleChange(event) {
    this.setState({
      [event.target.name]: event.target.value
    });
      
  }

  _handleKeyDown=(e)=> {
    if (e.key === 'Enter') {
      this.handleSubmit();
    }
  }


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

      var redirictpage = this.props.userType == "admin" ? '/dashboard' : '/dashboard'
      return <Redirect to={redirictpage} />;
    }
    const classes = this.useStyles();

    return (

      <Fragment>
        <div className={'BgImage'} style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
          <Container style={{ borderRadius: "0.3rem", backgroundColor: "#ffffffb3", padding: "2rem" }} component="main" maxWidth="xs">
            <CssBaseline />
            <div className={classes.paper}>
              <Grid container style={{alignItems:"center",flexDirection:"column"}}>
              <Avatar variant='square' style={{  marginTop: '0.1rem', marginBottom: "1.2rem" }} src={EsraLogo} />
              <Typography style={{ fontFamily: "Helvetica Neue", fontWeight: "bold", marginBottom:'0.5rem' }} component="h1" variant="h5">
                Login
              </Typography>
              </Grid>
              <Form className="form">
                <Col>
                  <FormGroup>
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
                    <TextField
                      variant="outlined"
                      margin="normal"
                      required
                      fullWidth
                      color="black"
                      name="password"
                      label="Password"
                      type="password"
                      value={this.state.password}
                      onChange={this.handleChange}
                      onKeyDown={this._handleKeyDown}
                      id="password"
                      autoComplete="current-password"
                    />
                  </FormGroup>
                </Col>
                
                <FormControlLabel style={{marginLeft:"0.2rem"}}
                  control={<Checkbox value="lsRememberMe" id="rememberMe" color="primary" />}
                  label="Remember me"
                />
                <Grid container style={{alignItems:"center",flexDirection:"column"}}>
                <Button
                  fullWidth
                  variant="contained"
                  style={{ width: "11rem", display: "flex", color: "white", backgroundColor: "#343a40" }}
                  onClick={e => this.handleSubmit()}
                  className={classes.submit}
                >
                  Sign In
                </Button>
                </Grid>
              </Form>

            </div>
          </Container>
        </div>
      </Fragment>
    );
  }
}

export default withAlert()(Login)