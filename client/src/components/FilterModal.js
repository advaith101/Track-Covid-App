import React, { useState } from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter, Form, FormGroup, Label, Input, FormText } from 'reactstrap';


const FilterModal = (props) => {
  const {
    buttonLabel,
    className
  } = props;

  const [modal, setModal] = useState(false);

  const toggle = () => setModal(!modal);

  return (
    <div>
      <Button color="dark" style={{marginBottom: '2rem'}} onClick={toggle}>Filter</Button>
      <Modal isOpen={modal} toggle={toggle} className={className}>
        <ModalHeader toggle={toggle}>Specify Filter Criteria</ModalHeader>
        <ModalBody>
            <Form>
                <FormGroup>
                    <Label for="name">Name</Label>
                    <Input type="name" name="name" id="name" placeholder="Enter Name" />
                </FormGroup>
                <FormGroup>
                    <Label for="location">Select Location</Label>
                    <Input type="select" name="location" id="location">
                    <option>Boston, MA</option>
                    <option>New York, NY</option>
                    <option>Atlanta, GA</option>
                    </Input>
                </FormGroup>
                <FormGroup>
                    <Label for="department">Select Department</Label>
                    <Input type="select" name="department" id="department">
                    <option>Human Resources</option>
                    <option>Software</option>
                    <option>Research and Development</option>
                    </Input>
                </FormGroup>
                <FormGroup>
                    <Label for="reason">Select Reason Code</Label>
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
          <Button color="primary" onClick={toggle}>Filter</Button>{' '}
          <Button color="secondary" onClick={toggle}>Cancel</Button>
        </ModalFooter>
      </Modal>
    </div>
  );
}

export default FilterModal;
