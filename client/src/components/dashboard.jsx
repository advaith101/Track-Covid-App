import React from 'react';
import { Row } from 'simple-flexbox';
import { StyleSheet, css } from 'aphrodite';
import SidebarComponent from './sidebar/SidebarComponent';
import HeaderComponent from './header/HeaderComponent';
import Input from '@material-ui/core/Input';
import Grid from '@material-ui/core/Grid';
import Registration from "./registration"
import Paper from '@material-ui/core/Paper';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import SearchIcon from '@material-ui/icons/Search';
import FilterListIcon from '@material-ui/icons/FilterList';
import AbsenceTable from './AbsenceTable';
import CreateAbsence from './createAbsence.jsx';
import ChangePassword from './changePassword.jsx'
import { ExportCSV } from './ExportCSV';
import { Provider as AlertProvider, withAlert } from "react-alert";
import {
  BrowserRouter as Router,
  Route,
} from "react-router-dom";
import Loader from 'react-loader-spinner';

const styles = StyleSheet.create({
  container: {
    height: '100%',
    minHeight: '100vh'
  },
  content: {
    marginTop: 20,
    backgroundColor: "#fff",
    minHeight: "84vh",
    height: "auto",
    marginLeft: 20,
    marginRight: 20
  },
  mainBlock: {
    backgroundColor: '#F7F8FC',
    padding: 30
  },
  root: {
    padding: '2px 4px',
    display: 'flex',
    alignItems: 'center',
    width: 400,
  },
  input: {
    flex: 1,
  },
  iconButton: {
    padding: 10,
  },
  divider: {
    height: 28,
    margin: 4,
  }, root: {
    padding: '2px 4px',
    display: 'flex',
    alignItems: 'center'
  },
  input: {
    flex: 1,
  },
  iconButton: {
    padding: 10,
  },
  divider: {
    height: 28,
    margin: 4,
  }
});


class Dashboard extends React.Component {
  constructor(props) {
    super(props);
    this.state = { department: [], location: [], reason: [], isLoading: true };
  }

  apiCall = (url, method, data, name) => {
    this.setState({isLoading: true})
    return new Promise((resolve, reject) => {
      var bearer = 'Bearer ' + window.localStorage.getItem("bearer_token");
      data["companyID"] = Number(window.localStorage.getItem("CompanyID"));
      fetch("http://15.206.72.83:8090/" + url, {
        method: method,
        headers: {
          Accept: "application/json",
          'Authorization': bearer,
          "Content-Type": "application/json"
        },
        body: JSON.stringify(data),
      })
        .then(res => res.json())
        .then(res => {
          if (res.status == "error") {
            if( Object.keys(data).length >1) this.props.alert.show(name + "Api Error..!");
            if (res.errorMessage == "Token seems to be expired") {
              var refreshToken = { "refreshToken": window.localStorage.getItem("refresh_token") }
              fetch("http://15.206.72.83:8090/users/renewtoken", {
                method: "POST",
                headers: {
                  Accept: "application/json",
                  "Content-Type": "application/json"
                },
                body: JSON.stringify(refreshToken)
              }).then(res => res.json())
                .then(res => {
                  if (res.status == "ok") {
                    window.localStorage.setItem("bearer_token", res.token);
                    this.apiCall(url, method, data, "renew token ");
                  }
                })
            }
          }
          else {
            resolve(res);
            this.setState({isLoading: false})
            if( Object.keys(data).length>1  ) this.props.alert.show(name + "Api Success..!");
          }
        }).catch(res => {
          reject(res);
        })
    })
  }
  handleFiltering() {
    
  }

  componentDidMount() {
    this.props.onRef(this);
    window.addEventListener('resize', this.resize);
    setTimeout(() => {
      this.apiCall("common/getdepartments", "POST", {}, "get department ").then(department => this.setState({ department }))
    }, 0);
    setTimeout(() => {
      this.apiCall("common/getlocations", "POST", {}, "get location ").then(location => this.setState({ location }))
    }, 0);
    setTimeout(() => {
      this.apiCall("common/getreasons", "POST", {}, "get reason ").then(reason => this.setState({ reason }))
    }, 0);
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.resize);
    this.props.onRef(undefined)
  }

  resize = () => this.forceUpdate();

  // LoadingIndicator = () => {
  //   const { promiseInProgress } = usePromiseTracker();
  
  //   return promiseInProgress && 
  //     <div
  //       style={{
  //         width: "100%",
  //         height: "100",
  //         display: "flex",
  //         justifyContent: "center",
  //         alignItems: "center"
  //       }}
  //     >
  //       <Loader type="Circles" color="#2F4F4F" height="100" width="100" />
  //     </div>
  // };

  render() {
    const { reason, location, department } = this.state;
    return (
      <Router>
        <Row className={css(styles.container)} style={{ background: "#f1f3f6", width: "100vw" }}>
          <SidebarComponent />
          <Grid container style={{ flexDirection: "column", width: "100%" }}>
            <HeaderComponent />

            <Route path={["/dashboard", "/dashboard/leaveRecord"]} exact render={(props) => (
              <div className={css(styles.content)} style={{ width: "97%" }}>
                <div style={{ height: "9vw", display: "flex", justifyContent: "center", alignItems: "center", flexDirection: "column" }}>
                  <Paper className={css(styles.root)} style={{ width: "56%", height: "34%" }}>
                    <IconButton className={css(styles.iconButton)} aria-label="menu">

                      <FilterListIcon style={{ color: "#547795" }} />
                    </IconButton>
                    <Input
                      className={css(styles.input)}
                      placeholder="Search "
                      disableUnderline={true}
                      onChange={(e) => { this.table && this.table.externalFilterChanged(e.target.value); }}
                    />
                    <IconButton className={css(styles.iconButton)} >
                      <SearchIcon style={{ color: "#547795" }} />
                    </IconButton>
                    {Number(window.localStorage.getItem("isAdmin")) ? (<React.Fragment><Divider className={css(styles.divider)} orientation="vertical" />
                      <ExportCSV csvData={this.table && this.table.excelData()} fileName={'absence_report'} /></React.Fragment>) : ""}
                  </Paper>
                  
                  <Grid container style={{marginTop: "10px", minWidth: "56%", width: "auto", display: "flex", alignItems: "center" }}>
                    <span style={{ fontSize: "14px", color: "#788195", marginBottom: "2px" }}>{`Filters (2 results):`}</span>
                    <span class="breadCrumb" onClick={this.handle}style={{ marginLeft: "45px", display: "flex", alignItems: "center", fontSize: "14px", color: "light-grey" }}>Filter 1 <span style={{ display: "flex", alignItems: "center", marginLeft: "5px" }}><ion-icon style={{ fontSize: "14px" }} name="close"></ion-icon></span></span>
                    <span class="breadCrumb" style={{ marginLeft: "45px", display: "flex", alignItems: "center", fontSize: "14px", color: "light-grey" }}> Filter 2<span style={{ display: "flex", alignItems: "center", marginLeft: "5px" }}><ion-icon style={{ fontSize: "14px" }} name="close"></ion-icon></span></span>
                    <span class="breadCrumb" style={{ marginLeft: "45px", fontSize: "14px", color: "light-grey" }}>Clear all</span>
                  </Grid>
                  
                </div>
                {this.state.isLoading && 
                    <div style={{display: 'flex', justifyContent: "center", alignItems: "center"}}>
                    <Loader type="ThreeDots" color="#2F4F4F" height="100" width="100" />
                    </div>}
                <AbsenceTable onRef={ref => (this.table = ref)} userType={this.props.userType} reason={reason} department={department} location={location} name={this.props.name} email={this.props.email} apiCall={this.apiCall} />
                
              </div>)} />
            <Route path="/dashboard/registration" render={() => (<Registration userType={this.props.userType} apiCall={this.apiCall} department={department} location={location} />)} />
            <Route path="/dashboard/createAbsence" render={() => (<CreateAbsence userType={this.props.userType} reason={reason} apiCall={this.apiCall} />)} />
            <Route path="/dashboard/changePassword" render={() => (<ChangePassword apiCall={this.apiCall} userType={this.props.userType} />)} />
          </Grid>
        </Row>
      </Router>
    );
  }
}

export default withAlert()(Dashboard)
