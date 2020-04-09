import React, { Component, Fragment } from 'react';
import { Container, Button, Table } from 'reactstrap';
import FilterModal from './FilterModal'
const axios = require('axios');


// TODO: move to a utils folder
export function formattedDate(date) {
    let year = date.getFullYear();
    let month = (1 + date.getMonth()).toString().padStart(2, '0');
    let day = date.getDate().toString().padStart(2, '0');
    return month + '/' + day + '/' + year;
}

// TODO: move to a utils folder
export function formattedDateSpanFromAbsence(absence) {
    const formattedStartDate = formattedDate(new Date(absence.startDate));
    const formattedEndDate = absence.current ? 'Present' : formattedDate(new Date(absence.endDate));
    return  formattedStartDate + ' - ' + formattedEndDate;
}

class AbsenceTable extends Component {
    state = {
        viewModels: []
    }

    getUser(email) {
        return axios.post("/api/users", {email});
    }
    
    componentDidMount() {
        if(this.props.userType === "employee") {
            axios.post("/api/absences/", {email: this.props.email}).then(res => {
                const data = res.data;
                this.setState({ viewModels: data });
            });

        } else {
            // Fetch data for admin
            axios.get(`/api/absences/all`).then(res => {
                const data = res.data;
    
                const userPromises = data.map(async absence => {
                    return this.getUser(absence.id).then(response => {
                        const user = {...response.data[0]};
                        console.log(user);
                        const viewModel = {
                            user: {
                                name: user.name,
                                location: user.location,
                                department: user.department
                            },
                            absence: absence
                        };
                        return viewModel;
                    });
                })
    
                Promise.all(userPromises).then(viewModels => {
                    console.log(viewModels);
                    this.setState({ viewModels });
                });
    
            });
        }

    }

    employeeTable() {
        return (
            <Table hover>
            <thead className="thead-dark">
                <tr>
                <th>Leave Reason</th>
                <th>Date of Absence</th>
                <th>View Report</th>
                </tr>
            </thead>
            <tbody>
                {this.state.viewModels.map((viewModel) => (
                    <tr key={viewModel.id}>
                    <td>{viewModel.reason}</td>
                    <td>{formattedDateSpanFromAbsence(viewModel)}</td>
                    <td><Button>View</Button></td>
                    </tr>
                ))}
            </tbody>
            </Table>
        );
    }

    adminTable() {
        return (
            <Fragment>
            <FilterModal />
            <Table hover>
            <thead className="thead-dark">
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
                {this.state.viewModels.map((viewModel) => (
                    <tr key={viewModel.absence.id}>
                    <td>{viewModel.user.name}</td>
                    <td>{viewModel.absence.reason}</td>
                    <td>{formattedDateSpanFromAbsence(viewModel.absence)}</td>
                    <td>{viewModel.user.location}</td>
                    <td>{viewModel.user.department}</td>
                    <td>{viewModel.absence.processed ? 'Yes' : 'No'}</td>
                    <td><Button>View</Button></td>
                    </tr>
                ))}
            </tbody>
            </Table>
            </Fragment>
        );
    }

    tableForType(userType) {
        return (userType === 'admin' ? this.adminTable() : this.employeeTable());
    }

    render() {
        return(
            <Container>
                <Button
                color="dark"
                style={{marginBottom: '2rem'}}
                onClick={() => {
                    const name = prompt('Enter name');
                    if(name) {
                        this.setState(state => ({
                            data: [...state.data, { name }]
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
                {this.tableForType(this.props.userType)}

            </Container>
        );
    }

}

export default AbsenceTable;
