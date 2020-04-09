import React, {Component} from 'react'
import {Route, Switch} from 'react-router-dom'
import DashboardHeader from './components/DashboardHeader';
import Login from './components/Login';
import AbsenceTable from './components/AbsenceTable';

class MainRouter extends Component {
    
    render() {
        return (
            <div>
                <Switch>

                    <Route exact path="/"> 
                        <Login />
                    </Route>

                    <Route exact path="/admin/dashboard">
                        <DashboardHeader barTitle="Administrator Dashboard"/>
                        <AbsenceTable userType="admin"/>
                    </Route>

                    <Route exact path="/dashboard">
                        <DashboardHeader barTitle="Employee Dashboard"/>
                        <AbsenceTable  userType="employee" name="Goti" email="zx2q5890lm@gmail.com"/>
                    </Route>

                </Switch>
            </div>
        );
    }
}


export default MainRouter;