import React, { Component, Fragment} from 'react';
import {Route, Switch, Redirect} from 'react-router-dom'
import { Container,Button ,  Table, Row } from 'reactstrap';
import FilterModal from './FilterModal';
import CreateAbsence from './CreateAbsence'
import PasswordChangeModal from './PasswordChangeModal'
import { ExportCSV } from './ExportCSV';
import { string } from 'prop-types';
import "../App.css"
import Typography from '@material-ui/core/Typography';
import { AgGridReact } from "ag-grid-react";
import "ag-grid-community/dist/styles/ag-grid.css";
import "ag-grid-community/dist/styles/ag-theme-balham.css";
import 'typeface-roboto';
import DeleteAbsenceModal from './DeleteAbsenceModal';


import { createMuiTheme, withStyles, makeStyles, ThemeProvider } from '@material-ui/core/styles';
// import Button from '@material-ui/core/Button';
import { green, purple } from '@material-ui/core/colors';

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
    constructor(props) {
        super(props);
        this.handleFiltering = this.handleFiltering.bind(this);
        this.resetFilteredViewModels = this.resetFilteredViewModels.bind(this);
        this.handleCreateAbsence = this.handleCreateAbsence.bind(this);
        this.updateEmployeeViewModels = this.updateEmployeeViewModels.bind(this);
        this.handlePasswordChange = this.handlePasswordChange.bind(this);  
        this.handleDeleteAbsence = this.handleDeleteAbsence.bind(this);      
    }
    

    state = {
        viewModels: [], // these are to be kept as our reset viewModels, do not modify
        filteredViewModels: [],
        employeeViewModels: []
        
    }


    getUser(email) {
        return axios.post("/api/users", {email});
    }

    
    updateEmployeeViewModels() {
        axios.post("/api/absences/", {email: this.props.email}).then(res => {
            const data = res.data;
            console.log(data);
            console.log("Look here" + this.props.email);
            this.setState({ employeeViewModels: [...data] });
            console.log(this.state.employeeViewModels);
            //this.forceUpdate()
        });
    }

    componentDidMount() {
        console.log('Component did mount!');
        console.log(this.props.userType);
        if(this.props.userType === "employee") {
            this.updateEmployeeViewModels()
        } 
        else{
            // Fetch data for admin
            this.createViewModels()
        }
        
    }

    updateFilteredViewModels(filterQuery) {
        axios.post(`/api/filter/`, filterQuery).then(res => {
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
                this.setState({filteredViewModels: [...viewModels] });//spread is key
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

    excelData() {
        return this.state.filteredViewModels.map(viewModel => {return {
            name: viewModel.user.name, 
            email: viewModel.absence.id, 
            location:viewModel.user.location, 
            department:viewModel.user.department, 
            reason:viewModel.absence.reason,  
            startDate:viewModel.absence.startDate,
             endDate:viewModel.absence.endDate,
              current:viewModel.absence.current,
               processed:viewModel.absence.processed}});
               
    }

    
    
    

    employeeTable() {
        var rowValue = [];
        this.state.employeeViewModels && this.state.employeeViewModels.map((viewModel) => {
        rowValue.push({"id": viewModel._id, "leavereason": viewModel.reason, "dateOfAbsence": formattedDateSpanFromAbsence(viewModel)})
        })
        const header = [ { headerName: "ID", field: "id", resizable: true },
        { headerName: "Leave Reason", field: "leavereason", resizable: true },
        { headerName: "Date of Absence", field: "dateOfAbsence", resizable: true }]
        return (
            <Fragment>
                {/* <CreateAbsence handleCreateAbsence={this.handleCreateAbsence}/>
                <PasswordChangeModal handlePasswordChange={this.handlePasswordChange}/> */}
                <Row>
                
                    <CreateAbsence handleCreateAbsence={this.handleCreateAbsence}/>
                    <PasswordChangeModal handlePasswordChange={this.handlePasswordChange}/>
                    <DeleteAbsenceModal handleDeleteAbsence={this.handleDeleteAbsence}/>
                </Row>
                <h4 style={{display:'flex', alignItems:'center', justifyContent:'center'}}>Your Personal Leave Records</h4>
                
                < div
                className = "ag-theme-balham"
                style = {{
                    height: "65vh",
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    
                }}
            
                >
                <AgGridReact
                    onGridReady={(params)=>params.api.sizeColumnsToFit()}
                    columnDefs={header}
                    rowData={rowValue}
                    paginationAutoPageSize={true}
                    singleClickEdit={true}
                    pagination={true}
                ></AgGridReact>
                            </div >
                            </Fragment>
                        );
    }

    handleFiltering(filterQuery) {
        console.log(filterQuery);
        this.updateFilteredViewModels(filterQuery);
    }

    handleCreateAbsence(newAbsenceQuery) {
        newAbsenceQuery.id = this.props.email;
        console.log(newAbsenceQuery);
        axios.post(`/api/absences/create`, newAbsenceQuery).then(smthg => {
            console.log("Creating absence for" + this.props.email);
            this.updateEmployeeViewModels()
        }).catch(err => console.log(err));
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

    handleDeleteAbsence(deleteQuery) {
        console.log(deleteQuery)
        axios.post('/api/absences/delete', deleteQuery).then(e => {
            console.log('Absence Deleted!');
        })
    }
    
    

    adminTable() {
       
        var rowValue = [];
        this.state.filteredViewModels && this.state.filteredViewModels.map((viewModel) => {
        rowValue.push({ "name": viewModel.user.name, "leavereason": viewModel.absence.reason, "dateOfAbsence": formattedDateSpanFromAbsence(viewModel.absence),
        "location": viewModel.user.location, "department": viewModel.user.department})
        })
        const header = [{ headerName: "Name", field: "name", resizable: true }, { headerName: "Leave Reason", field: "leavereason", resizable: true },
        { headerName: "Date of Absence", field: "dateOfAbsence", resizable: true }, { headerName: "Location", field: "location", resizable: true },
        { headerName: "Department", field: "department", resizable: true }]
        return (
            <Fragment>
            {/* <Button
                style={{marginBottom: '2rem', marginLeft: '2rem'}}
                onClick={() => {
                    // Pop up modal with form
                }}>Go to Personal Dashboard
            </Button> */}
            <Button
                style={{marginBottom: '2rem',color: "white", position: "relative", float: "left", bottom: "10px", fontSize: "1rem", backgroundColor: "#343a40"}}
                onClick={() => {
                    this.handleFiltering({absenceQuery: {current: true}});
                }}>Show Only Current Absences
            </Button>
            <div className="float-right">
                <ExportCSV csvData={this.excelData()} fileName={'absence_report'} style={{marginBottom: '5rem', marginLeft: '5rem'}} />
            </div>
            <div className="float-right">
                <Row>
                    <FilterModal handleFiltering={this.handleFiltering}/>
                    <Button className="btn-primary" style={{backgroundColor: "#343a40",marginBottom: '2rem', marginRight: '2rem'}} onClick={this.resetFilteredViewModels} className="float-right">Clear Filter</Button>
                </Row>
            </div>
            <h3 style={{display:'flex', alignItems:'center', justifyContent:'center'}}>Employee Leave Records</h3>
            <div
                className="ag-theme-balham"
                style={{
                    height: "65vh",
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center'
                }}
            >
                <AgGridReact
                    onGridReady={(params)=>params.api.sizeColumnsToFit()}
                    columnDefs={header}
                    rowData={rowValue}
                    paginationAutoPageSize={true}
                    singleClickEdit={true}
                    pagination={true}                    
                ></AgGridReact>
            </div>
            </Fragment>
        );
    }

    tableForType(userType) {
        console.log('rendering based on user type...')
        return (userType === 'admin' ? this.adminTable() : this.employeeTable());
    }
    
    render() {
        console.log(this.props.email);
      
            // if (localStorage.getItem("logintype") !== null && localStorage.getItem("logintype") !== ''){
                return (<Container>
                    {this.tableForType(this.props.userType)}
                    </Container>)
            //   } else{
            //      return (<Redirect to='/'/>)
            //   }
            // <Container>
            //     {this.tableForType(this.props.userType)}
            // </Container>
        
    }

}

export default AbsenceTable;
