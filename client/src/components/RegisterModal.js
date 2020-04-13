import React, { useState } from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter, Form, FormGroup, Label, Input, FormText } from 'reactstrap';


const RegisterModal = (props) => {

  const [modal, setModal] = useState(false);

  const toggle = () => setModal(!modal);

  const handleSubmit = () => {
    setModal(!modal)

    props.handleRegister(registerQuery)

  }

  var registerQuery = {
    
  }

  return (
    <div>
      <Button className="btn-primary" style={{marginBottom: '2rem', marginRight: '1rem'}} onClick={toggle} className="float-right">Register</Button>
      <Modal isOpen={modal} toggle={toggle} >
        <ModalHeader toggle={toggle}>Register</ModalHeader>
        <ModalBody>
            <Form>
                <FormGroup>
                    <Label for="name">Enter Name</Label>
                    <Input type="name" name="name" id="name" placeholder="Enter Name" onChange={e => registerQuery.name = e.target.value}/>
                </FormGroup>
                <FormGroup>
                    <Label for="email">Enter Employee Email</Label>
                    <Input type="email" email="email" id="email" placeholder="Enter Email" onChange={e => registerQuery.email = e.target.value}/>
                </FormGroup>
                <FormGroup>
                    <Label for="password">Create Password</Label>
                    <Input type="password" password="password" id="password" placeholder="Create Password" onChange={e => registerQuery.password = e.target.value}/>
                </FormGroup>
                {/* !need to change this to verify if password = confirmpassword! */}
                <FormGroup>
                    <Label for="confirmpassword">Confirm Password</Label>
                    <Input type="password" confirmpassword="confirmpassword" id="password" placeholder="Confirm Password" onChange={e => registerQuery.password = e.target.value}/>
                </FormGroup>
                <FormGroup>
                    <Label for="location">Select Location</Label>
                    <Input type="select" name="location" id="location" onChange={e => registerQuery.location = e.target.value}>
                    <option>--</option>
                    <option>Boston, MA</option>
                    <option>New York, NY</option>
                    <option>Atlanta, GA</option>
                    </Input>
                </FormGroup>
                <FormGroup>
                    <Label for="department">Select Department</Label>
                    <Input type="select" name="department" id="department" onChange={e => registerQuery.department = e.target.value}>
                    <option>--</option>
                    <option>Human Resources</option>
                    <option>Software</option>
                    <option>Research and Development</option>
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

export default RegisterModal;