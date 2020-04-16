import React, { useState } from 'react';
import {  Modal, ModalHeader, ModalBody, ModalFooter, Form, FormGroup, Label, Input, FormText } from 'reactstrap';
import { createMuiTheme, withStyles, makeStyles, ThemeProvider } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import { green, purple } from '@material-ui/core/colors';
import DeleteIcon from '@material-ui/icons/Delete';

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

const DeleteAbsenceModal = (props) => {
  const {
    buttonLabel,
    className
  } = props;

  const [modal, setModal] = useState(false);

  const toggle = () => {
      setModal(!modal)
  };

  var deleteQuery = { }

  const onSubmit = () => {
    props.handleDeleteAbsence(deleteQuery);
    alert('Delete successful');
    setModal(!modal);

  }

  return (
    <div>
     <BootstrapButton
       onClick = {toggle} type="submit" fullWidth variant="contained" color="default" style={{color: "white",backgroundColor: "#343a40",marginLeft:'2rem',marginBottom: '2rem'}} onClick={toggle}
       variant="contained"
       color="primary"
       size="large"
       startIcon={<DeleteIcon/>}
        >Delete Absence
      </BootstrapButton>
{/*       <Button color="dark" style={{marginBottom: '2rem'}} onClick={toggle}>Change Password</Button> */}
      <Modal isOpen={modal} toggle={toggle} className={className}>
        <ModalHeader toggle={toggle}>Delete Absence</ModalHeader>
        <ModalBody>
            <Form>
                <FormGroup>
                    <Label for="absenceid">Absence ID:</Label>
                    <Input type="name" name="name" id="absenceid" placeholder="Enter your Absence ID" onChange={e => deleteQuery._id = e.target.value}/>
                </FormGroup>    
            </Form>
        </ModalBody>
        <ModalFooter>
          <Button color="primary" onClick={onSubmit}>Delete</Button>{' '}
          <Button color="secondary" onClick={toggle}>Cancel</Button>
        </ModalFooter>
      </Modal>
    </div>
  );
}

export default DeleteAbsenceModal;