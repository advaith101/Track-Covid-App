import React, {Component} from 'react'
import {Route, Switch, Redirect} from 'react-router-dom'
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
        admin: false        
    }

    handleStateChange(user) {
        this.setState({
            name: user.name,
            email: user.email,
            userType: user.admin ? "admin" : "employee"
        });
        console.log("global state change");

    }
   
    render() {
        
        return (           
            <div>
                <Switch>

                    <Route exact path="/"> 
                        <Login userType={this.state.userType} handleStateChange={this.handleStateChange}/>
                    </Route>
                   
          <Route exact path="/admin/dashboard"  render={() => (  this.state.userType == "admin" ?              
          <>
          <DashboardHeader userType={this.state.userType} barTitle="Administrator Dashboard"/>
          <AbsenceTable userType={this.state.userType} name={this.state.name} email={this.state.email}/> </>
           :
            <Redirect to='/' />
        )} 
        />
      
       <Route exact path="/dashboard"  render={() => ( this.state.userType == "employee" ?          
          <>
          <DashboardHeader  barTitle="Employee Dashboard"/>
          <AbsenceTable  userType={this.state.userType} name={this.state.name} email={this.state.email}/> </>
           :
            <Redirect to='/' />
        )} 
      />
                   

                </Switch>
            </div>
        );
    }
}


export default MainRouter;