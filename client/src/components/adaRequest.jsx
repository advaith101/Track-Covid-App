import React, { Component } from 'react';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import TextField from '@material-ui/core/TextField';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import {Radio, RadioGroup, FormControlLabel, FormLabel} from '@material-ui/core'
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

export default class AdaRequest extends Component {
  constructor(props) {
    super(props);
    this.state = { formData: {}, incorrectEntryError: false } //added formData which is a json with the data from form, error in case they didn't answer a question.
    this.email = React.createRef();
    this.name = React.createRef(); //created ref for name
  }
  submit = () => {
    var { formData, incorrectEntryError } = this.state;
    if ( this.email.current && !this.email.current.value) incorrectEntryError = true; else incorrectEntryError = false;
    if ( this.name.current && !this.name.current.value) incorrectEntryError = true; else incorrectEntryError = false; 
    this.setState({ incorrectEntryError })
    if (!incorrectEntryError) { //name is also required so I added it here
      var post_data = formData;
      console.log(post_data);

      //API Call needs to be done here

    //   this.props.apiCall("absence/insertabsence", "POST", post_data,"Absence record added successfully","Failed to add absence record")
    //     .then(res => {
    //       if (res.status == "ok") {
    //         this.setState({ startDate: moment(), endDate: moment(), reasonId: null, reasonError: false });
    //         if(this.email.current)this.email.current.value = "";
    //         this.props.props.history.push("/dashboard/leaveRecord");
    //         this.props.refreshRouter();
    //       }
    //     })
    }

  }
  render() {
    const { formData, incorrectEntryError } = this.state;
    return (
      <Paper className="containers">
        <Grid container style={{ fontSize: "24px", color: "#006b6a", paddingLeft: "5.8vw", marginTop: "3rem", marginBottom: "1rem" }}>
          <span>{Number(window.localStorage.getItem("isAdmin")) ?"CREATE EMPLOYEE ADA REQUEST":"CREATE ADA REQUEST"}</span>
        </Grid>

        {Number(window.localStorage.getItem("isAdmin")) ? (
        <Grid container style={{ alignItems: "center" }}>
        
          <Grid item xs={12} md={6} className="items">
            <TextField style={{ width: "70%" }} id="name" label="Enter Employee Name" error={incorrectEntryError} helperText={(incorrectEntryError) ? "Incorrect entry." : ""} inputRef={this.name} onChange={(e) => { this.setState({ incorrectEntryError: (e.target.value) ? false : true }) }} />
          </Grid>
          
        
          <Grid item xs={12} md={6} className="items">
            <TextField style={{ width: "70%" }} id="email" label="Enter Employee Email" error={incorrectEntryError} helperText={(incorrectEntryError) ? "Incorrect entry." : ""} inputRef={this.email} onChange={(e) => { this.setState({ incorrectEntryError: (e.target.value) ? false : true }) }} />
          </Grid>
        </Grid>
         ):""}

        <Grid container style={{ alignItems: "center" }}>
          <Grid item xs={12} md={6} className="items" style={{marginTop:"2.2rem"}}>
            <FormControl style={{ width: "70%" }} error={incorrectEntryError}>
              <FormLabel id="demo-simple-select-outlined-label">Are you currently working?</FormLabel>
              <RadioGroup
                value={formData.isWorking}
                onChange={(e) => this.state.formData["isWorking"] = e.target.value}
              >
                <FormControlLabel value="yes" control={<Radio />} label="Yes" />
                <FormControlLabel value="no" control={<Radio />} label="No" />

              </RadioGroup>
              <FormHelperText>{(incorrectEntryError) ? "Incorrect entry." : ""}</FormHelperText>
            </FormControl>
          </Grid>

          <Grid item xs={12} md={6} className="items" style={{marginTop:"2.2rem"}}>
            <FormControl style={{ width: "70%" }} error={incorrectEntryError}>
              <FormLabel id="demo-simple-select-outlined-label">Are you currently hospitalized?</FormLabel>
              <RadioGroup
                value={formData.isHospitalized}
                onChange={(e) => this.state.formData["isHospitalized"] = e.target.value}
              >
                <FormControlLabel value="yes" control={<Radio />} label="Yes" />
                <FormControlLabel value="no" control={<Radio />} label="No" />

              </RadioGroup>
              <FormHelperText>{(incorrectEntryError) ? "Incorrect entry." : ""}</FormHelperText>
            </FormControl>
          </Grid>
          <Grid item xs={12} md={6} className="items" style={{marginTop:"2.2rem"}}>
            <FormControl style={{ width: "70%" }} error={incorrectEntryError}>
              <FormLabel id="demo-simple-select-outlined-label">Are you currently receiving any workplace accommodations based upon your medical
                condition?</FormLabel>
              <RadioGroup
                value={formData.isReceivingAccommodations}
                onChange={(e) => this.state.formData["isReceivingAccommodations"] = e.target.value}
              >
                <FormControlLabel value="yes" control={<Radio />} label="Yes" />
                <FormControlLabel value="no" control={<Radio />} label="No" />

              </RadioGroup>
              <FormHelperText>{(incorrectEntryError) ? "Incorrect entry." : ""}</FormHelperText>
            </FormControl>
          </Grid>
          <Grid item xs={12} md={6} className="items" style={{marginTop:"2.2rem"}}>
            <FormControl style={{ width: "70%" }} error={incorrectEntryError}>
              <FormLabel id="demo-simple-select-outlined-label">Is your accommodation request due to self-quarantine without a diagnosis?</FormLabel>
              <RadioGroup
                value={formData.isDueToSelfQuarantineWoDiagnosis}
                onChange={(e) => this.state.formData["isDueToSelfQuarantineWoDiagnosis"] = e.target.value}
              >
                <FormControlLabel value="yes" control={<Radio />} label="Yes" />
                <FormControlLabel value="no" control={<Radio />} label="No" />

              </RadioGroup>
              <FormHelperText>{(incorrectEntryError) ? "Incorrect entry." : ""}</FormHelperText>
            </FormControl>
          </Grid>
          <Grid item xs={12} md={6} className="items" style={{marginTop:"2.2rem"}}>
            <FormControl style={{ width: "70%" }} error={incorrectEntryError}>
              <FormLabel id="demo-simple-select-outlined-label">Is your accommodation request due to School or Childcare closures?</FormLabel>
              <RadioGroup 
                value={formData.isDueToClosures}
                onChange={(e) => this.state.formData["isDueToClosures"] = e.target.value}
              >
                <FormControlLabel value="yes" control={<Radio />} label="Yes" />
                <FormControlLabel value="no" control={<Radio />} label="No" />

              </RadioGroup>
              <FormHelperText>{(incorrectEntryError) ? "Incorrect entry." : ""}</FormHelperText>
            </FormControl>
          </Grid>
          <Grid item xs={12} md={6} className="items" style={{marginTop:"2.2rem"}}>
            <FormControl style={{ width: "70%" }} error={incorrectEntryError}>
              <FormLabel id="demo-simple-select-outlined-label">Are you experiencing symptoms of COVID-19?</FormLabel>
              <RadioGroup 
                value={formData.isExperiencingSymptoms}
                onChange={(e) => this.state.formData["isExperiencingSymptoms"] = e.target.value}
              >
                <FormControlLabel value="yes" control={<Radio />} label="Yes" />
                <FormControlLabel value="no" control={<Radio />} label="No" />

              </RadioGroup>
              <FormHelperText>{(incorrectEntryError) ? "Incorrect entry." : ""}</FormHelperText>
            </FormControl>
          </Grid>
          <Grid item xs={12} md={6} className="items" style={{marginTop:"2.2rem"}}>
            <FormControl style={{ width: "70%" }} error={incorrectEntryError}>
              <FormLabel id="demo-simple-select-outlined-label">Have you been diagnosed with COVID-19?</FormLabel>
              <RadioGroup 
                value={formData.isDiagnosed}
                onChange={(e) => this.state.formData["isDiagnosed"] = e.target.value}
              >
                <FormControlLabel value="yes" control={<Radio />} label="Yes" />
                <FormControlLabel value="no" control={<Radio />} label="No" />

              </RadioGroup>
              <FormHelperText>{(incorrectEntryError) ? "Incorrect entry." : ""}</FormHelperText>
            </FormControl>
          </Grid>
          <Grid item xs={12} md={6} className="items" style={{marginTop:"2.2rem"}}>
            <FormControl style={{ width: "70%" }} error={incorrectEntryError}>
              <FormLabel id="demo-simple-select-outlined-label">Has your medical provider requested for you to be quarantined due to your medical condition?</FormLabel>
              <RadioGroup 
                value={formData.isRequestedToQuarantine}
                onChange={(e) => this.state.formData["isRequestedToQuarantine"] = e.target.value}
              >
                <FormControlLabel value="yes" control={<Radio />} label="Yes" />
                <FormControlLabel value="no" control={<Radio />} label="No" />

              </RadioGroup>
              <FormHelperText>{(incorrectEntryError) ? "Incorrect entry." : ""}</FormHelperText>
            </FormControl>
          </Grid>

          <Grid item xs={12} md={6} className="items" style={{marginTop:"2.2rem"}}>
            <FormControl style={{ width: "70%" }} error={incorrectEntryError}>
              <FormLabel id="demo-simple-select-outlined-label">Has your medical provider requested for you to be quarantined due to potential exposure to
                COVID-19?</FormLabel>
              <RadioGroup 
                value={formData.isRequestedToQuarantineExposure}
                onChange={(e) => this.state.formData["isRequestedToQuarantineExposure"] = e.target.value}
              >
                <FormControlLabel value="yes" control={<Radio />} label="Yes" />
                <FormControlLabel value="no" control={<Radio />} label="No" />

              </RadioGroup>
              <FormHelperText>{(incorrectEntryError) ? "Incorrect entry." : ""}</FormHelperText>
            </FormControl>
          </Grid>
          <Grid item xs={12} md={6} className="items" style={{marginTop:"2.2rem"}}>
            <FormControl style={{ width: "70%" }} error={incorrectEntryError}>
              <FormLabel id="demo-simple-select-outlined-label">Do you currently have a medical condition that currently affects your ability to perform your
                job?</FormLabel>
              <RadioGroup 
                value={formData.isHavingMedicalCondition}
                onChange={(e) => this.state.formData["isHavingMedicalCondition"] = e.target.value}
              >
                <FormControlLabel value="yes" control={<Radio />} label="Yes" />
                <FormControlLabel value="no" control={<Radio />} label="No" />

              </RadioGroup>
              <FormHelperText>{(incorrectEntryError) ? "Incorrect entry." : ""}</FormHelperText>
            </FormControl>
          </Grid>
          <Grid item xs={12} md={6} className="items" style={{marginTop:"2.2rem"}}>
            <FormControl style={{ width: "70%" }} error={incorrectEntryError}>
              <FormLabel id="demo-simple-select-outlined-label">Have you been treated for the same/similar condition in the past?</FormLabel>
              <RadioGroup 
                value={formData.isTreated}
                onChange={(e) => this.state.formData["isTreated"] = e.target.value}
              >
                <FormControlLabel value="yes" control={<Radio />} label="Yes" />
                <FormControlLabel value="no" control={<Radio />} label="No" />

              </RadioGroup>
              <FormHelperText>{(incorrectEntryError) ? "Incorrect entry." : ""}</FormHelperText>
            </FormControl>
          </Grid>
          <Grid item xs={12} md={6} className="items" style={{marginTop:"2.2rem"}}>
            <FormControl style={{ width: "70%" }} error={incorrectEntryError}>
              <FormLabel id="demo-simple-select-outlined-label">Are you being treated for a medical condition?</FormLabel>
              <RadioGroup 
                value={formData.isBeingTreated}
                onChange={(e) => this.state.formData["isBeingTreated"] = e.target.value}
              >
                <FormControlLabel value="yes" control={<Radio />} label="Yes" />
                <FormControlLabel value="no" control={<Radio />} label="No" />

              </RadioGroup>
              <FormHelperText>{(incorrectEntryError) ? "Incorrect entry." : ""}</FormHelperText>
            </FormControl>
          </Grid>
          <Grid item xs={12} md={6} className="items" style={{marginTop:"2.2rem"}}>
            <FormControl style={{ width: "70%" }} error={incorrectEntryError}>
              <FormLabel id="demo-simple-select-outlined-label">Is your accommodation request related to pregnancy?</FormLabel>
              <RadioGroup 
                value={formData.isRelatedToPregnancy}
                onChange={(e) => this.state.formData["isRelatedToPregnancy"] = e.target.value}
              >
                <FormControlLabel value="yes" control={<Radio />} label="Yes" />
                <FormControlLabel value="no" control={<Radio />} label="No" />

              </RadioGroup>
              <FormHelperText>{(incorrectEntryError) ? "Incorrect entry." : ""}</FormHelperText>
            </FormControl>
          </Grid>
          <Grid container style={{ alignItems: "center" }}>
          <Grid item xs={12} md={6} className="items" style={{marginTop:"2.2rem"}}>
            <FormControl style={{ width: "70%" }} error={incorrectEntryError}>
              <FormLabel id="demo-simple-select-outlined-label">If yes, is your request related to a complication of pregnancy? (Put N/A if not applicable to you)</FormLabel>
              <RadioGroup 
                value={formData.isComplicatedPregnancy}
                onChange={(e) => this.state.formData["isComplicatedPregnancy"] = e.target.value}
              >
                <FormControlLabel value="yes" control={<Radio />} label="Yes" />
                <FormControlLabel value="no" control={<Radio />} label="No" />
                <FormControlLabel value="na" control={<Radio />} label="N/A" />

              </RadioGroup>
              <FormHelperText>{(incorrectEntryError) ? "Incorrect entry." : ""}</FormHelperText>
            </FormControl>
          </Grid>
          <Grid item xs={12} md={6} className="items" style={{marginTop:"2.2rem"}}>
            <FormControl style={{ width: "70%" }} error={incorrectEntryError}>
              <FormLabel id="demo-simple-select-outlined-label">Are you currently receiving any workplace accommodations based upon your pregnancy related
                condition? (Put N/A if not applicable to you)</FormLabel>
              <RadioGroup 
                value={formData.isReceivingAccommodationsPregnancy}
                onChange={(e) => this.state.formData["isReceivingAccommodationsPregnancy"] = e.target.value}
              >
                <FormControlLabel value="yes" control={<Radio />} label="Yes" />
                <FormControlLabel value="no" control={<Radio />} label="No" />
                <FormControlLabel value="na" control={<Radio />} label="N/A" />

              </RadioGroup>
              <FormHelperText>{(incorrectEntryError) ? "Incorrect entry." : ""}</FormHelperText>
            </FormControl>
          </Grid>
          </Grid>
          
            

        </Grid>

          <Grid container style={{ justifyContent: "flex-end", width: "92.6%", marginTop: "2vw", marginBottom: "2rem"}} >
            <Button variant="contained" color="secondary" onClick={this.submit}> Submit </Button>
          </Grid>
       
      </Paper>
    )
  }
}