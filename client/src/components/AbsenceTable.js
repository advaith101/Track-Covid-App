import React, { Component, Fragment } from 'react';
import { Container, Button, Table, Row } from 'reactstrap';
import FilterModal from './FilterModal';
import CreateAbsence from './CreateAbsence'
import PasswordChangeModal from './PasswordChangeModal'

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
    constructor() {
        super()
        this.handleFiltering = this.handleFiltering.bind(this);
        this.resetFilteredViewModels = this.resetFilteredViewModels.bind(this);
        this.handleCreateAbsence = this.handleCreateAbsence.bind(this);
        this.updateEmployeeViewModels = this.updateEmployeeViewModels.bind(this);
        this.handlePasswordChange = this.handlePasswordChange.bind(this);
    }

    state = {
        viewModels: [], // these are to be kept as our reset viewModels, do not modify
        filteredViewModels: []
    }

    getUser(email) {
        return axios.post("/api/users", {email});
    }

    
    updateEmployeeViewModels() {
        axios.post("/api/absences/", {email: this.props.email}).then(res => {
            const data = res.data;
            this.setState({ viewModels: [...data] });
            this.forceUpdate()
        });
    }
    
    componentDidMount() {
        console.log('Component did mount!');
        if(this.props.userType === "employee") {
            this.updateEmployeeViewModels()

        } else {
            // Fetch data for admin
            this.createViewModels()
        }
    }

    updateFilteredViewModels(filterQuery) {
        axios.post(`/api/filter`, filterQuery).then(res => {
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
                this.setState({filteredViewModels: [...viewModels] });
            });
        });
    }

    createViewModels() {
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
                this.setState({ viewModels: viewModels, filteredViewModels: [...viewModels] });
            });

        });
    }

    employeeTable() {
        return (
            <Fragment>
                <CreateAbsence handleCreateAbsence={this.handleCreateAbsence}/>
                <PasswordChangeModal handlePasswordChange={this.handlePasswordChange}/>
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
            </Fragment>
        );
    }

    handleFiltering(filterQuery) {
        console.log(filterQuery);
        this.updateFilteredViewModels(filterQuery);
    }

    handleCreateAbsence(newAbsenceQuery) {
        console.log(newAbsenceQuery);
        axios.post(`/api/absences/create`, newAbsenceQuery).then(this.updateEmployeeViewModels());
    }

    resetFilteredViewModels() {
        this.setState({filteredViewModels: [... this.state.viewModels]});
    }

    handlePasswordChange(newPassword) {
        console.log(newPassword)
        const passwordChangeQuery = {
            "email": this.props.email,
            "password": newPassword
        }
        axios.put("/api/users", passwordChangeQuery);

    }

    adminTable() {
        return (
            <Fragment>
            <div className="float-right">
                <Row>
                    <FilterModal handleFiltering={this.handleFiltering}/>
                    <Button color="dark" style={{marginBottom: '2rem'}} onClick={this.resetFilteredViewModels} className="float-right">Clear Filter</Button>
                </Row>
            </div>
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
                {this.state.filteredViewModels.map((viewModel) => (
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
                    this.handleFiltering({absenceQuery: {current: true}});
                }}>Show Only Current Absences
                </Button>

                <Button
                color="dark"
                style={{marginBottom: '2rem', marginLeft: '2rem'}}
                onClick={() => {
                    // Pop up modal with form
                }}>Go to Personal Dashboard
                </Button>
                {this.tableForType(this.props.userType)}

            </Container>
        );
    }

}

export default AbsenceTable;
