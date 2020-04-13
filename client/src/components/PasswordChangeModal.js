import React, { useState } from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter, Form, FormGroup, Label, Input, FormText } from 'reactstrap';


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
      <Button color="dark" style={{marginBottom: '2rem'}} onClick={toggle}>Change Password</Button>
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