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
import 'date-fns';
import "./registration.css";
import DateFnsUtils from '@date-io/date-fns';
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker,
} from '@material-ui/pickers';
var moment = require('moment');

export default class CreateAbsence extends Component {
  constructor(props) {
    super(props);
    this.state = { startDate: moment(), endDate: moment(), reasonId: null, reasonError: false, emailError: false }
    this.email = React.createRef();

  }
  submit = () => {
    var { startDate, endDate, reasonId, reasonError, emailError } = this.state;
    this.setState({ reasonError: (reasonId) ? false : true, emailError: (this.email.current.value) ? false : true });
    if (!this.email.current.value) emailError = true; else emailError = false;
    if (!reasonId) reasonError = true; else reasonError = false;
    this.setState({ reasonError, emailError })
    if (!reasonError && !emailError) {
      var post_data = {
        "email": this.email.current.value, "startDate": moment(startDate).format("YYYY MM DD"),
        "endDate": moment(endDate).format("YYYY MM DD"), "reasonID": reasonId, "isCurrent": 1, "isProcessed": 0, "createdBy": Number(window.localStorage.getItem("userId"))
      };
      this.props.apiCall("absence/insertabsence", "POST", post_data, "insert absence ")
        .then(res => {
          if (res.status == "ok") {
            this.setState({ startDate: moment(), endDate: moment(), reasonId: null, reasonError: false });
            this.email.current.value = "";
          }
        })
    }

  }
  render() {
    const { startDate, endDate, reasonId, reasonError, emailError } = this.state;
    return (
      <Paper className="containers">
        <Grid container style={{ alignItems: "center" }}>
          <Grid item xs={12} md={6} className="items">
            <TextField style={{ width: "70%" }} id="email" label="Enter Employee Email" error={emailError} helperText={(emailError) ? "Incorrect entry." : ""} inputRef={this.email} onChange={(e) => { this.setState({ emailError: (e.target.value) ? false : true }) }} />
          </Grid>
          <Grid item xs={12} md={6} className="items">
            <FormControl style={{ width: "70%" }} error={reasonError}>
              <InputLabel id="demo-simple-select-outlined-label">Select Reason</InputLabel>
              <Select
                labelId="demo-simple-select-outlined-label"
                id="demo-simple-select-outlined"
                value={reasonId}
                onChange={(e) => this.setState({ reasonId: e.target.value, reasonError: (e.target.value) ? false : true })}
                label="Select Location"
              >
                {
                  this.props.reason.data && this.props.reason.data.map(value => (
                    <MenuItem value={value.ReasonID}>{value.Name}</MenuItem>
                  ))
                }
              </Select>
              <FormHelperText>{(reasonError) ? "Incorrect entry." : ""}</FormHelperText>
            </FormControl>
          </Grid>
        </Grid>
        <Grid container style={{ alignItems: "center" }}>
          <Grid item xs={12} md={6} className="items">
            <MuiPickersUtilsProvider utils={DateFnsUtils} style={{ width: "70%" }}>
              <KeyboardDatePicker
                style={{ width: "70%" }}
                disableToolbar
                variant="inline"
                format="MM/dd/yyyy"
                margin="normal"
                id="date-picker-inline"
                label="Start Date"
                value={startDate}
                onChange={(e) => this.setState({ startDate: e })}
                KeyboardButtonProps={{
                  'aria-label': 'change date',
                }}
              />
            </MuiPickersUtilsProvider>
          </Grid>
          <Grid item xs={12} md={6} className="items">
            <MuiPickersUtilsProvider utils={DateFnsUtils} style={{ width: "70%" }}>
              <KeyboardDatePicker
                style={{ width: "70%" }}
                disableToolbar
                variant="inline"
                format="MM/dd/yyyy"
                margin="normal"
                id="date-picker-inline"
                label="End Date"
                value={endDate}
                onChange={(e) => this.setState({ endDate: e })}
                minDate={this.state.startDate}
                KeyboardButtonProps={{
                  'aria-label': 'change date',
                }}
              />
            </MuiPickersUtilsProvider>
          </Grid>


          <Grid container style={{ justifyContent: "flex-end", width: "92.6%" }} >
            <Button variant="contained" color="secondary" onClick={this.submit}> Submit </Button>
          </Grid>
        </Grid>
      </Paper>
    )
  }
}
