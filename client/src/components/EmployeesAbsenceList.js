import React, { Component } from 'react';
import { Container, ListGroup, ListGroupItem, Button, Table } from 'reactstrap';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
const { v4: uuidv4 } = require('uuid');

class EmployeeAbsenceList extends Component {
    state = {
        data: [],
        displayedData: [],
        absences: [
            {id: uuidv4(), name: 'Nick' },
            {id: uuidv4(), name: 'Jakob' },
            {id: uuidv4(), name: 'Advaith' },
            {id: uuidv4(), name: 'swaraj' },
        ]
    }

    render() {
        const { absences } = this.state;
        return(
            <Container>

                <Button
                color="dark"
                style={{marginBottom: '2rem'}}
                onClick={() => {
                    const name = prompt('Enter name');
                    if(name) {
                        this.setState(state => ({
                            absences: [...state.absences, { id: uuidv4(), name }]
                        }));
                    }
                }}>New Entry
                </Button>

                <Button
                color="dark"
                style={{marginBottom: '2rem', marginLeft: '2rem'}}
                onClick={() => {
                    // Pop up modal with form
                }}>Add Absence
                </Button>

                <Table hover>
                    <thead class="thead-dark">
                        <tr>
                        <th>Name</th>
                        <th>Leave Reason</th>
                        <th>Date of Absence</th>
                        <th>Location</th>
                        <th>Department</th>
                        <th>Processed</th>
                        <th>View Report</th>
                        </tr>
                    </thead>
                    <tbody>
                        {absences.map(({id, name}) => (
                            <tr>
                            <td>{name}</td>
                            <td>leave reason</td>
                            <td>date range</td>
                            <td>location</td>
                            <td>department</td>
                            <td>yes/no</td>
                            <td><Button>View</Button></td>
                            </tr>
                        ))}
                    </tbody>
                </Table>
            </Container>
        );
    }

}

export default EmployeeAbsenceList;

                // {/* <ListGroup>
                //     <TransitionGroup className="employee-absence-list">
                //         {absences.map(({id, name}) => (
                //             <CSSTransition key={id} timeout={500} classNames="fade">
                //                 <ListGroupItem>
                //                 {name}
                //                 <Button
                //                     className="remove-btn"
                //                     color="danger"
                //                     size="sm"
                //                     onClick={() => {
                //                         this.setState(state => ({
                //                             absences: state.absences.filter(absence => absence.id !== id)
                //                         }));
                //                     }}
                //                 >&times;</Button>
                //                 </ListGroupItem>
                //             </CSSTransition>
                //         ))}
                //     </TransitionGroup>
                // </ListGroup>  */}


