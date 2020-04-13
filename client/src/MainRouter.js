import React, {Component} from 'react'
import {Route, Switch} from 'react-router-dom'
import DashboardHeader from './components/DashboardHeader';
import Login from './components/Login';
import AbsenceTable from './components/AbsenceTable';

class MainRouter extends Component {

    constructor() {
        super()
        this.handleStateChange = this.handleStateChange.bind(this);
    }

    state = {
        // maybe a logged in
        name: "",
        email: "",
        admin: false,
    }

    handleStateChange(user) {
        this.setState({
            name: user.name,
            email: user.email,
            userType: user.admin ? "admin" : "employee"
        });
        console.log("global state change");

    }
    // var ProtectedRoute = ({ isAllowed, ...props }) => 
    //  isAllowed 
    //  ? <Route {...props}/> 
    //  : <Redirect to="/authentificate"/>;

    
    render() {
        return (
            <div>
                <Switch>

                    <Route exact path="/"> 
                        <Login userType={this.state.userType} handleStateChange={this.handleStateChange}/>
                    </Route>

                    <Route exact path="/admin/dashboard">
                        <DashboardHeader barTitle="Administrator Dashboard"/>
                        <AbsenceTable userType="admin" name={this.state.name} email={this.state.email}/>
                    </Route>

                    {/* <Route exact path="/admin/dashboard" => (
                        user.admin == "admin" ?
                        <DashboardHeader barTitle="Administrator Dashboard"/>
                        <AbsenceTable userType="admin" name={this.state.name} email={this.state.email}/>
                        : <Redirect to='/' />
                    )} /> */}

                    <Route exact path="/dashboard">
                        <DashboardHeader barTitle="Employee Dashboard"/>
                        <AbsenceTable  userType="employee" name={this.state.name} email={this.state.email}/>
                    </Route>

                </Switch>
            </div>
        );
    }
}


export default MainRouter;