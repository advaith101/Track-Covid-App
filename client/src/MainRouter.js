import React, { Component } from 'react'
import { Route, Switch, Redirect } from 'react-router-dom'
import Login from './components/Login';
import Dashboard from './components/dashboard';
import { transitions, positions, Provider as AlertProvider } from "react-alert";
import "./App.css"

const AlertTemplate = ({ style, message, close }) => (
    <div style={style} className="alertTemplate">
        {message}<div style={{ marginRight: "15px", marginLeft: "15px" }} onClick={close}>x</div>
    </div>
)
// optional cofiguration
const options = {
    // you can also just use 'bottom center'
    position: positions.BOTTOM_RIGHT,
    timeout: 4000,
    offset: '10px',
    // you can also just use 'scale'
    transition: transitions.SCALE
}

class MainRouter extends Component {

    constructor() {
        super()
        this.handleStateChange = this.handleStateChange.bind(this);
        this.url = "https://api.esratrackcovid.com/";
        // this.url = "http://15.206.72.83:8090/";
    }

    state = {
        // maybe a logged in
        name: "",
        email: window.localStorage.getItem("email"),
        admin: false
    }

    handleStateChange(user, email) {
        this.setState({
            name: user.UserName,
            email: email,
            userType: user.IsAdmin ? "admin" : "employee"
        });
    }

    apiCall(url, method, data, message) {
        this.dashboard.apiCall(url, method, data, message);
    }

    render() {

        return (
            <div>

                <Switch>

                    <Route exact path="/">
                        <AlertProvider template={AlertTemplate} {...options}>
                            <Login url={this.url} userType={this.state.userType} apiCall={this.apiCall} handleStateChange={this.handleStateChange} />
                        </AlertProvider>
                    </Route>

                    <Route path="/dashboard" render={() => (this.state.email ?
                        <AlertProvider template={AlertTemplate} {...options}>
                            <Dashboard url={this.url} onRef={ref => (this.dashboard = ref)} userType={this.state.userType} name={this.state.name} email={this.state.email} /></AlertProvider>
                        : <Redirect to='/' />
                    )}
                    />


                </Switch>
            </div>
        );
    }
}

export default MainRouter;