import React, { useState } from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter, Form, FormGroup, Label, Input, FormText } from 'reactstrap';


const CreateAbsence = (props) => {
  const {
    buttonLabel,
    className
  } = props;

  const [modal, setModal] = useState(false);

  const toggle = () => setModal(!modal);

  return (
    <div>
      <Button color="dark" style={{marginBottom: '2rem'}} onClick={toggle}>Create/Update Absence</Button>
      <Modal isOpen={modal} toggle={toggle} className={className}>
        <ModalHeader toggle={toggle}>New Absence</ModalHeader>
        <ModalBody>
            <Form>
                <FormGroup>
                    <Label for="name">Name</Label>
                    <Input type="name" name="name" id="name" placeholder="Enter Name" />
                </FormGroup>
                <FormGroup>
                    <Label for="startDate">Start Date</Label>
                    <Input type="name" name="name" id="startDate" placeholder="Enter Start Date (eg. '01/01/2020')" />
                </FormGroup>
                <FormGroup>
                    <Label for="endDate">End Date</Label>
                    <Input type="name" name="name" id="endDate" placeholder="Enter End Date (eg. '12/20/2020')" />
                </FormGroup>
                <FormGroup>
                    <Label for="reason">Select Reason</Label>
                    <Input type="select" name="reason" id="reason">
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
          <Button color="primary" onClick={toggle}>Submit</Button>{' '}
          <Button color="secondary" onClick={toggle}>Cancel</Button>
        </ModalFooter>
      </Modal>
    </div>
  );
}

export default CreateAbsence;
