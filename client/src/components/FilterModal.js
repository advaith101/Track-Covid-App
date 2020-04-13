import React, { useState } from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter, Form, FormGroup, Label, Input, FormText } from 'reactstrap';


const FilterModal = (props) => {

  const [modal, setModal] = useState(false);

  const toggle = () => setModal(!modal);

  const handleSubmit = () => {
    setModal(!modal)

    props.handleFiltering(filterQuery)

  }

  var filterQuery = {
    userQuery: {

    },
    absenceQuery: {

    }
  }

  return (
    <div>
      <Button className="btn-primary" style={{marginBottom: '2rem', marginRight: '1rem'}} onClick={toggle} className="float-right">Filter</Button>
      <Modal isOpen={modal} toggle={toggle} >
        <ModalHeader toggle={toggle}>Specify Filter Criteria</ModalHeader>
        <ModalBody>
            <Form>
                <FormGroup>
                    <Label for="email">Enter Employee Email</Label>
                    <Input type="email" email="email" id="email" placeholder="Enter Email" onChange={e => filterQuery.userQuery.email = e.target.value}/>
                </FormGroup>
                <FormGroup>
                    <Label for="location">Select Location</Label>
                    <Input type="select" name="location" id="location" onChange={e => filterQuery.userQuery.location = e.target.value}>
                    <option>--</option>
                    <option>Boston, MA</option>
                    <option>New York, NY</option>
                    <option>Atlanta, GA</option>
                    </Input>
                </FormGroup>
                <FormGroup>
                    <Label for="department">Select Department</Label>
                    <Input type="select" name="department" id="department" onChange={e => filterQuery.userQuery.department = e.target.value}>
                    <option>--</option>
                    <option>Human Resources</option>
                    <option>Software</option>
                    <option>Research and Development</option>
                    </Input>
                </FormGroup>
                <FormGroup>
                    <Label for="reason">Select Reason Code</Label>
                    <Input type="select" name="reason" id="reason" onChange={e => filterQuery.absenceQuery.reason = e.target.value}>
                    <option>--</option>
                    <option>EE Quarantine - not sick</option>
                    <option>EE Quarantine - sick</option>
                    <option>Other Quarantine - not sick</option>
                    <option>Other Quarantine - sick</option>
                    <option>School/Business Closure</option>
                    </Input>
                </FormGroup>
                <FormGroup check>
                  <Label check>
                    <Input type="radio" name="radio1" onChange={e => filterQuery.absenceQuery.current = (e.target.value === 'on')} />{' '}
                    Filter for current absences
                  </Label>
                </FormGroup>
            </Form>
        </ModalBody>
        <ModalFooter>
          <Button color="primary" onClick={handleSubmit}>Filter</Button>{' '}
          <Button color="secondary" onClick={toggle}>Cancel</Button>
        </ModalFooter>
      </Modal>
    </div>
  );
}

export default FilterModal;


