import React, { Component } from 'react'
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import "./registration.css";
var sha512 = require('js-sha512');

export default class ChangePassword extends Component {
    constructor(props){
        super(props);
        this.currentPass = React.createRef();
        this.newPass = React.createRef();
        this.confPass = React.createRef();
        this.state = {currentPassErr:false,newPassErr:false,confPassErr:false};
       
    }
    submit=()=>{
        var {currentPassErr,newPassErr,confPassErr} = this.state;
        if(!this.currentPass.current.value) currentPassErr = true; else currentPassErr = false;
        if(!this.newPass.current.value) newPassErr = true; else newPassErr = false;
        if(this.confPass.current.value != this.newPass.current.value) confPassErr = true; else confPassErr = false;
        this.setState({currentPassErr,newPassErr,confPassErr});
        if(!currentPassErr&&!newPassErr&&!confPassErr){
            var post_data={"email":window.localStorage.getItem("email"),"oldPassword":sha512(this.currentPass.current.value),"newPassword": sha512(this.newPass.current.value) }
            this.props.apiCall("users/changepassword","POST",post_data,"Password changed successfully","Failed to change password")
            .then(res=>{if(res.status=="ok"){this.setState({currentPassErr:false,newPassErr:false,confPassErr:false});
            this.currentPass.current.value = "";
            this.newPass.current.value = "";
            this.confPass.current.value = "";
        }})
        }
    }
    render() {
        const {currentPassErr,newPassErr,confPassErr} = this.state;
        return (
            <Paper className="containers">
                <Grid container style={{ fontSize:"24px",color:"#006b6a",paddingLeft:"5.8vw" }}>
                    <span>CHANGE PASSWORD</span>
                </Grid>
                <Grid item xs={12} md={6}  className="items">
                    <TextField type="password" style={{ width: "70%" }} id="name" label="Old Password"  error={currentPassErr}  helperText={(currentPassErr)?"Incorrect entry.":""} inputRef={this.currentPass} onChange={(e)=>{this.setState({currentPassErr:(e.target.value)?false:true})}}  />
                </Grid>
                <Grid item xs={12} md={6} className="items">
                    <TextField type="password" style={{ width: "70%" }} id="email" label="New Password"  error={newPassErr}  helperText={(newPassErr)?"Incorrect entry.":""} inputRef={this.newPass} onChange={(e)=>{this.setState({newPassErr:(e.target.value)?false:true})}} />
                </Grid>
                <Grid item xs={12} md={6} className="items">
                    <TextField type="password" style={{ width: "70%" }} id="crPassword" label="Confirm Password"  error={confPassErr}  helperText={(confPassErr)?"Incorrect entry.":""} inputRef={this.confPass} onChange={(e)=>{this.setState({confPassErr:(e.target.value)?false:true})}}  />
                </Grid>
             
                <Grid container style={{justifyContent:"flex-end",width:"92.6%"}} >
                    <Button variant="contained" color="secondary" onClick={this.submit}> Submit </Button>
                </Grid>

            </Paper>
        )
    }
}
