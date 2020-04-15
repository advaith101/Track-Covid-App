import React, { useState } from 'react';
import { Modal, ModalHeader, ModalBody, ModalFooter, Form, FormGroup, Label, Input } from 'reactstrap';

import Avatar from '@material-ui/core/Avatar';
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
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';


const CreateAbsenceAdmin = (props) => {
  const {
    className
  } = props;

  const [modal, setModal] = useState(false);

  const toggle = () => setModal(!modal);

  const handleSubmit = () => {
    setModal(!modal)

    props.handleCreateAbsenceAdmin(newAbsenceQuery)
  }

  var newAbsenceQuery = {
    id: "",
    startDate: "",
    endDate: "",
    reason: "",
    current: false,
    processed: false
  } 

  return (
    <div>
      <Button onClick = {toggle} type="submit" variant="contained" color="default" style={{marginBottom: '2rem'}} onClick={toggle}>Create Employee Absence</Button>
      <Modal isOpen={modal} toggle={toggle} className={className}>
        <ModalHeader toggle={toggle}>New Absence</ModalHeader>
        <ModalBody>
            <Form>
                <FormGroup>
                    <Label for="email">Email</Label>
                    {/* <Input type="name" name="name" id="startDate" placeholder="Enter Start Date (eg. '01/01/2020')" onChange={e => newAbsenceQuery.startDate = e.target.value}/> */}
                    <TextField
                      variant="outlined"
                      margin="normal"
                      required
                      fullWidth
                      name="email"
                      onChange={e => newAbsenceQuery.id = e.target.value}
                      id="email"
                    />
                </FormGroup>
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

export default CreateAbsenceAdmin;