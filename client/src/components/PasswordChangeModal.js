import React, { useState } from 'react';
import {  Modal, ModalHeader, ModalBody, ModalFooter, Form, FormGroup, Label, Input, FormText } from 'reactstrap';
import { createMuiTheme, withStyles, makeStyles, ThemeProvider } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import { green, purple } from '@material-ui/core/colors';
import LockIcon from '@material-ui/icons/Lock';

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

const ColorButton = withStyles((theme) => ({
  root: {
    color: theme.palette.getContrastText(purple[500]),
    backgroundColor: purple[500],
    '&:hover': {
      backgroundColor: purple[700],
    },
  },
}))(Button);

const useStyles = makeStyles((theme) => ({
  margin: {
    margin: theme.spacing(1),
  },
}));

const theme = createMuiTheme({
  palette: {
    primary: green,
  },
});

const PasswordChangeModal = (props) => {
  const {
    buttonLabel,
    className
  } = props;

  const [modal, setModal] = useState(false);

  const toggle = () => {
      setModal(!modal)
  };

  var passwordQuery = { }

  const onSubmit = () => {
  alert(' Password changed successful')
    setModal(!modal)

    // verify new passwords match
    if(passwordQuery.firstNewPassword === passwordQuery.secondNewPassword) {
        props.handlePasswordChange(passwordQuery.firstNewPassword)
    } else {
        // trigger alert saying password do not match
    }
  }

  return (
    <div>
     <BootstrapButton
       onClick = {toggle} type="submit" fullWidth variant="contained" color="default" style={{color: "white",backgroundColor: "#343a40",marginLeft:'2rem',marginBottom: '2rem'}} onClick={toggle}
       variant="contained"
       color="primary"
       size="large"
       startIcon={<LockIcon/>}
        >Change Password
      </BootstrapButton>
{/*       <Button color="dark" style={{marginBottom: '2rem'}} onClick={toggle}>Change Password</Button> */}
      <Modal isOpen={modal} toggle={toggle} className={className}>
        <ModalHeader toggle={toggle}>Change Password</ModalHeader>
        <ModalBody>
            <Form>
                <FormGroup>
                    <Label for="currentpassword">Current Password:</Label>
                    <Input type="password" name="name" id="currentpassword" placeholder="Enter current password" />
                </FormGroup>
                <FormGroup>
                    <Label for="newpassword">New Password:</Label>
                    <Input type="password" name="name" id="newpassword" placeholder="Enter new password" onChange={e => passwordQuery.firstNewPassword = e.target.value}/>
                </FormGroup>
                <FormGroup>
                    <Label for="confirmpassword">Confirm New Password:</Label>
                    <Input type="password" name="name" id="confirmpassword" placeholder="Confirm new password" onChange={e => passwordQuery.secondNewPassword = e.target.value}/>
                </FormGroup>       
            </Form>
        </ModalBody>
        <ModalFooter>
          <Button color="primary" onClick={onSubmit}>Change Password</Button>{' '}
          <Button color="secondary" onClick={toggle}>Cancel</Button>
        </ModalFooter>
      </Modal>
    </div>
  );
}

export default PasswordChangeModal;