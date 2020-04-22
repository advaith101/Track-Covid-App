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
import MenuItem from '@material-ui/core/MenuItem';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';

import InputLabel from '@material-ui/core/InputLabel';
import Container from '@material-ui/core/Container';
import 'typeface-roboto';
import "../App.css";
import EsraLogo from '../assets/EsraLogo.ico';



class Login extends Component {
  constructor(props) {
    super(props)
    this.state = {
      email: localStorage.rmemail,
      password: localStorage.rmpassword,
      redirect: false,
      loading: false,
      company:[],
      emailError:false,
      passwordError:false,
      companyError:false,
      companyId:"",
      check:(localStorage.rmemail)?true:false
    };
    this.rembMe = React.createRef();
    this.handleSubmit = this.handleSubmit.bind(this)
    this.handleChange = this.handleChange.bind(this)
    this.useStyles = this.useStyles.bind(this)
  }

  
  handleSubmit() {
    var {companyError,emailError,passwordError,companyId,email,password,companyId,check} = this.state;
    if(email) emailError=false; else emailError=true;
    if(password) passwordError=false; else passwordError=true;
    if(companyId) companyError=false; else companyError=true;
this.setState({emailError,passwordError,companyError})
if(!emailError && !passwordError && !companyError){
if(check){
localStorage.rmemail = email;
localStorage.rmpassword = password;
}
else{
  localStorage.email = "";
  localStorage.password = "";
}
  fetch(this.props.url+"users/validatelogin", {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json"
    },
    body: JSON.stringify({ email: this.props.encryptByDESModeCBC(this.state.email), password: this.props.encryptByDESModeCBC(this.state.password),companyID:this.state.companyId})
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
else{

}
    
  }

componentDidMount=()=>{

  fetch(this.props.url+"common/getcompanies", {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json"
    },
    body: JSON.stringify({ })
  })
    .then(res => res.json())
    .then(res => {
      console.log(res,"res");
    this.setState({company:res,companyId:res.data[0].CompanyID})})
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
      },
      submit: {
        margin: theme.spacing(3, 0, 2),
      }
    }))
    )
  }
  render() {
    const { redirect,companyError,emailError,passwordError,companyId,email,password,company,check } = this.state;
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
              <Avatar variant='square' style={{  marginTop: '0.1rem', marginBottom: "1rem" }} src={EsraLogo} />
              <Typography style={{ fontFamily: "Roboto", fontWeight: "bold", marginBottom:'0.3rem' }} component="h1" variant="h5">
                Login
              </Typography>
              </Grid>
  
              <Grid item xs={12}  >
                 
                    <TextField
                    variant="outlined"
                      margin="normal"
                      required
                      fullWidth
                      id="email"
                      label="Email Address"
                      name="email"
                      value={this.state.email}
                      onChange={(e)=>{this.handleChange(e);this.setState({ emailError: (e.target.value) ? false : true })}}
                      error={emailError} helperText={(emailError) ? "Incorrect entry." : ""}
                      autoComplete="email"
                      autoFocus
                    />
                 
                </Grid>
                <Grid item xs={12}  >
               
                    <TextField
                      margin="normal"
                      variant="outlined"
                      required
                      fullWidth
                      color="black"
                      name="password"
                      label="Password"
                      type="password"
                      value={this.state.password}
                      onChange={(e)=>{this.handleChange(e);this.setState({ passwordError: (e.target.value) ? false : true })}}
                      onKeyDown={this._handleKeyDown}
                      error={passwordError} helperText={(passwordError) ? "Incorrect entry." : ""} 
                      id="password"
                      autoComplete="current-password"
                    />
             
                </Grid>
                <Grid item xs={12}  >
            <FormControl style={{ width: "100%" ,marginTop:"1rem"}} variant="outlined" error={companyError}>
              <InputLabel id="demo-simple-select-outlined-label">Select company</InputLabel>
              <Select
                labelId="demo-simple-select-outlined-label"
                id="demo-simple-select-outlined"
                value={companyId}
                onChange={(e) => this.setState({ companyId: e.target.value, companyError: (e.target.value) ? false : true })}
                label="Select Location"
              >
                {
                  this.state.company.data && this.state.company.data.map(value => (
                    <MenuItem value={value.CompanyID}>{value.CompanyName}</MenuItem>
                  ))  
                }
              </Select>
              <FormHelperText>{(companyError) ? "Incorrect entry." : ""}</FormHelperText>
            </FormControl>
          </Grid>
                <FormControlLabel style={{marginTop:"0.7rem"}}
                  control={<Checkbox value="lsRememberMe" id="rememberMe" checked={check} onChange={(e)=>this.setState({check:e.target.checked})} color="primary" />}
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


            </div>
          </Container>
        </div>
      </Fragment>
    );
  }
}

export default withAlert()(Login)