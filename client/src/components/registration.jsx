import React, { Component } from 'react';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import TextField from '@material-ui/core/TextField';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import Button from '@material-ui/core/Button';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Switch from '@material-ui/core/Switch';
import "./registration.css";


export default class Registration extends Component {
    constructor(props) {
        super(props);
        this.name = React.createRef();
        this.email = React.createRef();
        this.pass = React.createRef();
        this.confPass = React.createRef();
        this.state = {
            locationID: null, departmentID: null, checkedIsAdmin: false,
            nameError: false, emailError: false, locationIDError: false, departmentIDError: false, passwordError: false, confPassError: false
        }
    }
    handleChange = (e) => {
        this.setState({ checkedIsAdmin: e.target.checked })
    }
    submit = () => {
        var { checkedIsAdmin,nameError, emailError, locationIDError, departmentIDError, passwordError, confPassError, locationID, departmentID } = this.state;
        
        if (!this.name.current.value) nameError = true; else nameError = false;
        
        if (!this.email.current.value) emailError = true; else emailError = false;
        
        if (!this.pass.current.value) passwordError = true; else passwordError = false;
        
        if (this.confPass.current.value != this.pass.current.value) confPassError = true; else confPassError = false;
        
        if (!locationID) locationIDError = true; else locationIDError = false;
        
        if (!departmentID) departmentIDError = true; else departmentIDError = false;
        
        this.setState({ nameError, emailError, locationIDError, departmentIDError, passwordError, confPassError });
        if (!nameError && !emailError && !locationIDError && !departmentIDError && !passwordError && !confPassError) {
            var post_data = {
                "name":this.props.encryptByDESModeCBC(this.name.current.value), "email": this.props.encryptByDESModeCBC(this.email.current.value), "locationID": locationID,
                "departmentID": departmentID, "password": this.props.encryptByDESModeCBC(this.pass.current.value), "isAdmin": (checkedIsAdmin)?1:0, "createdBy": Number(window.localStorage.getItem("userId"))
            }
            this.props.apiCall("users/saveuser", "POST", post_data, "User added successfully","Failed to add user")
                .then(res => {
                    if (res.status == "ok") {
                        this.setState({
                            locationID: null, departmentID: null,
                            nameError: false, emailError: false, locationIDError: false, departmentIDError: false, passwordError: false, confPassError: false
                        });
                        this.name.current.value = "";
                        this.pass.current.value = "";
                        this.confPass.current.value = "";
                        this.email.current.value = "";
                    }
                })
        }
    }
    render() {
        const { locationID, checkedIsAdmin, departmentID, nameError, emailError, locationIDError, departmentIDError, passwordError, confPassError } = this.state;
        return (
            <Paper className="containers" style={{minHeight:"66%"}}>
                <Grid container style={{ fontSize:"24px",color:"#006b6a",paddingLeft:"5.8vw" }}>
                    <span>EMPLOYEE REGISTRATION</span>
                </Grid>
                <Grid container style={{ alignItems: "center" }}>
                    <Grid item xs={12} md={6} className="items">
                        <TextField style={{ width: "70%" }} id="name" label="Enter Name" error={nameError} helperText={(nameError) ? "Incorrect entry." : ""} inputRef={this.name} onChange={(e) => { this.setState({ nameError: (e.target.value) ? false : true }) }} />
                    </Grid>
                    <Grid item xs={12} md={6} className="items">
                        <TextField style={{ width: "70%" }} id="email" label="Enter Employee Email" error={emailError} helperText={(emailError) ? "Incorrect entry." : ""} inputRef={this.email} onChange={(e) => { this.setState({ emailError: (e.target.value) ? false : true }) }} />
                    </Grid>
                </Grid>
                <Grid container style={{ alignItems: "center" }}>
                    <Grid item xs={12} md={6} className="items">
                        <TextField type="password" style={{ width: "70%" }} id="crPassword" label="Create Password" error={passwordError} helperText={(passwordError) ? "Incorrect entry." : ""} inputRef={this.pass} onChange={(e) => { this.setState({ passwordError: (e.target.value) ? false : true }) }} />
                    </Grid>
                    <Grid item xs={12} md={6} className="items">
                        <TextField type="password" style={{ width: "70%" }} id="cnfPassword" label="Confirm Password" error={confPassError} helperText={(confPassError) ? "Incorrect entry." : ""} inputRef={this.confPass} onChange={(e) => { this.setState({ confPassError: (e.target.value) ? false : true }) }} />
                    </Grid>
                </Grid>
                <Grid container style={{ alignItems: "center" }}>
                    <Grid item xs={12} md={6} className="items">
                        <FormControl style={{ width: "70%" }} error={locationIDError}>
                            <InputLabel id="demo-simple-select-outlined-label">Select Location</InputLabel>
                            <Select
                                labelId="demo-simple-select-outlined-label"
                                id="demo-simple-select-outlined"
                                value={locationID}
                                onChange={(e) => this.setState({ locationID: e.target.value, locationIDError: (e.target.value) ? false : true })}
                                label="Select Location"
                            >
                                {
                                    this.props.location.data && this.props.location.data.map(value => (
                                        <MenuItem value={value.LocationID}>{value.Name}</MenuItem>
                                    ))
                                }

                            </Select>
                            <FormHelperText>{(locationIDError) ? "Incorrect entry." : ""}</FormHelperText>
                        </FormControl>
                    </Grid>
                    <Grid item xs={12} md={6} className="items">
                        <FormControl style={{ width: "70%" }} error={departmentIDError}>
                            <InputLabel id="demo-simple-select-outlined-label">Select Department</InputLabel>
                            <Select
                                labelId="demo-simple-select-outlined-label"
                                id="demo-simple-select-outlined"
                                value={departmentID}
                                onChange={(e) => this.setState({ departmentID: e.target.value, departmentIDError: (e.target.value) ? false : true })}
                                label="Select Department"
                            >
                                {
                                    this.props.department.data && this.props.department.data.map(value => (
                                        <MenuItem value={value.DepartmentID}>{value.Name}</MenuItem>
                                    ))
                                }
                            </Select>
                            <FormHelperText>{(departmentIDError) ? "Incorrect entry." : ""}</FormHelperText>
                        </FormControl>
                    </Grid>
                </Grid>
                <Grid container style={{color:"#788195",paddingLeft:"6vw"}}>
                    <FormControlLabel
                        control={<Switch checked={checkedIsAdmin} onChange={this.handleChange} name="checkedA" />}
                        label="Admin"
                    />
                </Grid>
                <Grid container style={{ justifyContent: "flex-end", width: "92.6%" }} >
                    <Button variant="contained" color="secondary" onClick={this.submit}> Submit </Button>
                </Grid>

            </Paper>
        )
    }
}
