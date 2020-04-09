import React, {Component} from 'react'
import {Route, Switch} from 'react-router-dom'
import AppNavbar from './components/AppNavbar';
import EmployeeAbsenceList from './components/EmployeesAbsenceList';
import Login from './components/Login';

class MainRouter extends Component {
    
    render() {
        return (
            <div>
                <Switch>

                    <Route exact path="/"> 
                        <Login />
                    </Route>

                    <Route exact path="/admin/dashboard">
                        <AppNavbar />
                        <EmployeeAbsenceList />
                    </Route>

                </Switch>
            </div>
        );
    }
}


export default MainRouter;