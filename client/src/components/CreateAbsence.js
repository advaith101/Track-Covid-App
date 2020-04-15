import React, { useState } from 'react';
import { Modal, ModalHeader, ModalBody, ModalFooter, Form, FormGroup, Label, Input } from 'reactstrap';

import Avatar from '@material-ui/core/Avatar';
// import Button from '@material-ui/core/Button';
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
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';

import Button from '@material-ui/core/Button';
import DeleteIcon from '@material-ui/icons/Delete';
import CloudUploadIcon from '@material-ui/icons/CloudUpload';
import KeyboardVoiceIcon from '@material-ui/icons/KeyboardVoice';
import Icon from '@material-ui/core/Icon';
import SaveIcon from '@material-ui/icons/Save';
import AddIcon from '@material-ui/icons/Add';
import LockIcon from '@material-ui/icons/Lock';


import { createMuiTheme, withStyles } from '@material-ui/core/styles';

const BootstrapButton = withStyles({
  root: {
    boxShadow: 'none',
    textTransform: 'none',
    fontSize: 16,
    padding: '6px 12px',
    border: '1px solid',
    lineHeight: 1.5,
    backgroundColor: '#0063cc',
    borderColor: '#0063cc',
    fontFamily: [
      '-apple-system',
      'BlinkMacSystemFont',
      '"Segoe UI"',
      'Roboto',
      '"Helvetica Neue"',
      'Arial',
      'sans-serif',
      '"Apple Color Emoji"',
      '"Segoe UI Emoji"',
      '"Segoe UI Symbol"',
    ].join(','),
    '&:hover': {
      backgroundColor: '#0069d9',
      borderColor: '#0062cc',
      boxShadow: 'none',
    },
    '&:active': {
      boxShadow: 'none',
      backgroundColor: '#0062cc',
      borderColor: '#005cbf',
    },
    '&:focus': {
      boxShadow: '0 0 0 0.2rem rgba(0,123,255,.5)',
    },
  },
})(Button);

const CreateAbsence = (props) => {
  const {
    className
  } = props;

  const [modal, setModal] = useState(false);

  const toggle = () => setModal(!modal);

  const handleSubmit = () => {
    setModal(!modal)
    props.handleCreateAbsence(newAbsenceQuery)
    alert('Absence added successful');
  }

  var newAbsenceQuery = {
    startDate: "",
    endDate: "",
    reason: "",
    current: false,
    processed: false
  } 

  

  return (
    <div>
       <BootstrapButton
       onClick = {toggle} type="submit" fullWidth variant="contained" color="default" style={{color: "white",backgroundColor: "#343a40",marginLeft:'1rem',marginBottom: '2rem'}} onClick={toggle}
       variant="contained"
       color="primary"
       size="large"
       startIcon={<AddIcon />}
        >Create/Update Absence
      </BootstrapButton>
      {/* <Button </Button> */}
      <Modal isOpen={modal} toggle={toggle} className={className}>
        <ModalHeader toggle={toggle}>New Absence</ModalHeader>
        <ModalBody>
            <Form>
                <FormGroup>
                    <Label for="startDate">Start Date</Label>
                    {/* <Input type="name" name="name" id="startDate" placeholder="Enter Start Date (eg. '01/01/2020')" onChange={e => newAbsenceQuery.startDate = e.target.value}/> */}
                    <TextField
                      variant="outlined"
                      margin="normal"
                      required
                      fullWidth
                      name="startDate"
                      type="date"
                      onChange={e => newAbsenceQuery.startDate = e.target.value}
                      id="startDate"
                    />
                </FormGroup>
                <FormGroup>
                    <Label for="endDate">End Date</Label>
                    {/* <Input type="name" name="name" id="endDate" placeholder="Enter End Date (eg. '12/20/2020')" onChange={e => newAbsenceQuery.endDate = e.target.value}/> */}
                    <TextField
                      variant="outlined"
                      margin="normal"
                      required
                      fullWidth
                      name="endDate"
                      type="date"
                      onChange={e => newAbsenceQuery.endDate = e.target.value}
                      id="endDate"
                    />
                </FormGroup>
                <FormGroup>
                    <Label for="reason">Select Reason</Label>
                    <Input type="select" name="reason" id="reason" onChange={e => newAbsenceQuery.reason = e.target.value}>
                    <option>--</option>
                    <option>EE Quarantine - not sick</option>
                    <option>EE Quarantine - sick</option>
                    <option>Other Quarantine - not sick</option>
                    <option>Other Quarantine - sick</option>
                    <option>School/Business Closure</option>
                    </Input>

                    {/* <Select
                    labelId="reason"
                    fullWidth
                    id="reason"
                    onChange={e => newAbsenceQuery.reason = e.target.value}
                    >
                    <MenuItem>--</MenuItem>
                    <MenuItem>EE Quarantine - not sick</MenuItem>
                    <MenuItem>EE Quarantine - sick</MenuItem>
                    <MenuItem>Other Quarantine - not sick</MenuItem>
                    <MenuItem>Other Quarantine - sick</MenuItem>
                    <MenuItem>School/Business Closure</MenuItem>
                    </Select> */}
                </FormGroup>
            </Form>
        </ModalBody>
        <ModalFooter>
          <Button color="primary" onClick={handleSubmit}>Submit</Button>{' '}
          <Button color="secondary" onClick={toggle}>Cancel</Button>
        </ModalFooter>
      </Modal>
    </div>
  );
}

export default CreateAbsence;

