import React from 'react';
import { Row } from 'simple-flexbox';
import { StyleSheet, css } from 'aphrodite';
import SidebarComponent from './sidebar/SidebarComponent.jsx';
import HeaderComponent from './header/HeaderComponent';
import FooterComponent from './footer/FooterComponent';
import Input from '@material-ui/core/Input';
import Grid from '@material-ui/core/Grid';
import Registration from "./registration";
import Paper from '@material-ui/core/Paper';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import SearchIcon from '@material-ui/icons/Search';
import Tooltip from '@material-ui/core/Tooltip';
import FilterListIcon from '@material-ui/icons/FilterList';
import AbsenceTable from './AbsenceTable';
import CreateAbsence from './createAbsence.jsx';
import AdaRequest from './adaRequest.jsx';
import Button from '@material-ui/core/Button';
import ChangePassword from './changePassword.jsx'
import { ExportCSV } from './ExportCSV';
import { ImportCSV } from './ImportCSV';
import DownloadTemp from './DownloadTemp';
import LeaveTable from './LeaveTable'
import * as XLSX from 'xlsx';
import { Provider as AlertProvider, withAlert } from "react-alert";
import Loader from 'react-loader-spinner';

import {
  BrowserRouter as Router,
  Route,
} from "react-router-dom";
var _ = require("underscore");
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
    this.state = { department: [], 
      location: [], 
      reason: [], 
      adaRequest: {}, 
      changeRouter:true, 
      isLoading: true,
      filters:[],
      iNACTIVE_USER_TIME_THRESHOLD: 30000,
      userActivityTimeout:null,
      online:false,
      uploadedabsences: React.createRef()};
      this.setOnline.bind(this);
      this.offlineStatus.bind(this);


  }
  sendFilterValue=(filters)=>{
this.setState({filters})
  }
refreshRouter=()=>{
  this.setState({changeRouter:!this.state.changeRouter})
}
  apiCall = (url, method, data, succMessage,errMessage) => {
    if(url != "timestamp/setonlinestatusonline") {
      this.setState({isLoading: true});
    }
    return new Promise((resolve, reject) => {
      var bearer = 'Bearer ' + window.localStorage.getItem("bearer_token");
      data["companyID"] = Number(window.localStorage.getItem("CompanyID"));
      fetch(this.props.url + url, {
        method: method,
        headers: {
          Accept: "application/json",
          'Authorization': bearer,
          "Content-Type": "application/json"
        },
        body: JSON.stringify(data)
      })
        .then(res => res.json())
        .then(res => {
          this.setState({isLoading: false})
          if (res.status == "error") {
            if( succMessage ) this.props.alert.show(errMessage );
            if (res.errorMessage == "Token seems to be expired") {
              var refreshToken = { "refreshToken": window.localStorage.getItem("refresh_token") }
              fetch(this.props.url+"users/renewtoken", {
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
                    this.apiCall(url, method, data,"");
                  }
                })
            }
          }
          else {
            resolve(res);
            if( succMessage ) this.props.alert.show(succMessage );
          }
        }).catch(res => {
          reject(res);
        })
    })
  }
  //resets
  resetUserActivityTimeout() {
  clearTimeout(this.state.userActivityTimeout);
  this.state.userActivityTimeout = setTimeout(() => {
    this.onlineStatus();
  }, this.state.iNACTIVE_USER_TIME_THRESHOLD);
    
  }

  setOnline() {


    //  this.setState({online:true})
     

     var post_data = {
       "userId":window.localStorage.getItem("userId"),
       "companyID":window.localStorage.getItem("companyID"),
       
     };
    this.apiCall("users/SaveUser", "POST", post_data)
    .then(res => {
      for (var i = 0; i < res.result[0].length; i++) {
      
        var post_data = {
          "Email":this.props.decryptByDESModeCBC(res.result[0][i].Email),
           "Name":this.props.decryptByDESModeCBC(res.result[0][i].Name),
            "Password":this.props.decryptByDESModeCBC(res.result[0][i].Password),
            "UserID": res.result[0][i].UserID

        }
          console.log(post_data);
          this.apiCall("users/decrypt", "POST", post_data)

        }

          }
      );    // this.onlineStatus();

  }

  onlineStatus() {

    this.resetUserActivityTimeout();
    var post_data = {
      "UserID":window.localStorage.getItem("userId"),
      "companyID":window.localStorage.getItem("companyID"),
      "online": 2,
    };

    this.apiCall("timestamp/setOnlineStatus", "POST", post_data);
  }

  offlineStatus() {
    this.setState({online:false})
    clearTimeout(this.state.userActivityTimeout);
    var post_data = {
      "userId":window.localStorage.getItem("userId"),
      "companyID": window.localStorage.getItem("CompanyID"),
    };
    this.apiCall("timestamp/addClockOut", "POST", post_data,"successfully clocked out","offline!");
    var post_data = {
      "UserID":window.localStorage.getItem("userId"),
      "companyID":window.localStorage.getItem("companyID"),
      "online": 0,
    };
    this.apiCall("timestamp/setOnlineStatus", "POST", post_data);
  }

  componentDidMount() {
    this.props.onRef(this);
    window.addEventListener('resize', this.resize);
    setTimeout(() => {
      this.apiCall("common/getdepartments", "POST", {}, "").then(department => this.setState({ department }))
    }, 0);
    setTimeout(() => {
      this.apiCall("common/getlocations", "POST", {}, "").then(location => this.setState({ location }))
    }, 0);
    setTimeout(() => {
      this.apiCall("common/getreasons", "POST", {}, "").then(reason => this.setState({ reason }))
    }, 0);
    
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.resize);
    this.props.onRef(undefined)
  }

  resize = () => this.forceUpdate();

  singleFilterRemove=(value,index)=>{
    this.table.clearAllfilter(value,index);
let filters = this.state.filters.filter(filterValue=>{
  if(filterValue == value) return false ;
  else return true;
})
    this.setState({filters})
  }



  render() {

    const { reason, location, department, filters, adaRequest, hovering } = this.state; //added adaRequest here
    let clockbutton;
    if(!this.state.online) {
        clockbutton= <Button variant="contained"style={{backgroundColor: '#006b6a', color:"white", marginRight:"1vw"}}
                  onClick={() => this.setOnline()}> Clock-in </Button>
    } else {
        clockbutton= <Button variant="contained"style={{backgroundColor: '#006b6a', color:"white", marginRight:"1vw"}}
                  onClick={() =>  this.offlineStatus()}> Clock-out </Button>
    }
    return (

      <Router  >
        <div
                    style={{
                        position: "absolute",
                        backgroundColor: "#21252926",
                        zIndex: 2,
                        height: "100vh",
                        width: "100vw",
                        display: this.state.isLoading ? "flex" : "none",
                        justifyContent: "center",
                        alignItems: "center"
                    }}
                >
                 
                    <Loader type="ThreeDots" color="#2F4F4F" height="100" width="100" />
                
                </div>
        <Row className={css(styles.container)} style={{ background: "#f1f3f6", width: "100vw" }}>
          <SidebarComponent changeRouter={this.state.changeRouter} dashboard={this}/>
          <Grid container style={{ flexDirection: "column", width: "100%", marginBottom:"0px" }}>
            <HeaderComponent />

            <Route path={["/dashboard", "/dashboard/leaveRecord"]} exact render={(props) => (
              <div className={`${css(styles.content)} contents`} style={{ width: "97%" }}>

                <div class="searchBar" style={{ minHeight: "6vw",height:"auto", display: "flex", justifyContent: "center", alignItems: "center", flexDirection: "row" }}>
                {clockbutton}
                  <Paper className={css(styles.root)} style={{ width: "56%", height: "auto",minHeigth:"3vw" }}>

                    <IconButton className={css(styles.iconButton)} aria-label="menu">
                      <FilterListIcon style={{ color: "#547795" }} />
                    </IconButton>
                    <Input
                      className={css(styles.input)}
                      placeholder="Search "
                      disableUnderline={true}
                      onChange={(e) => {this.table && this.table.externalFilterChanged(e.target.value); }}
                    />
                    <IconButton className={css(styles.iconButton)} >
                      <SearchIcon style={{ color: "#547795" }} />
                      
                    </IconButton>
                    {Number(window.localStorage.getItem("isAdmin")) ? (<React.Fragment><Divider className={css(styles.divider)} orientation="vertical" />
                      <Tooltip title="Dowload Current Table with Applied Filters" placement="top" arrow>
                        <div>                      
                          <ExportCSV csvData={this.table && this.table.excelData()} fileName={'absence_report'} />                        
                          </div>
                      </Tooltip>                  
                      <Divider className={css(styles.divider)} orientation="vertical" />
                      <Tooltip title="Upload an Excel SpreadSheet to add Absences" placement="top" arrow>
                        <div>
                        <ImportCSV parent={this} id="importer" />
                        </div>
                      </Tooltip>
                      <Divider className={css(styles.divider)} orientation="vertical" />
                      <Tooltip title="Download the Template for Uploading Documents" placement="top" arrow>
                        <div>
                          <DownloadTemp props={this.props}/>
                        </div>
                      </Tooltip></React.Fragment>) : ""}

  
                  </Paper>
                  <Grid container style={{ marginTop: "10px", minWidth: "56%", width: "auto", display:(filters.length)? "flex":"none", alignItems: "center" }}>
                    <span style={{ fontSize: "14px", color: "#788195", marginBottom: "2px" }} class="filterDisplayMobile">{`Filters ${(filters.length==1)?"(1 result):":"("+filters.length+"results):"}`}</span>
                    {
                      filters.map((value,index)=>{ 
                         return <span className="filterDisplayMobile breadCrumb" style={{ marginLeft: "45px", display: "flex", alignItems: "center", fontSize: "14px", color: "light-grey" }}>{value[0]} <span style={{ display: "flex", alignItems: "center", marginLeft: "5px" }}><ion-icon onClick={()=>this.singleFilterRemove(value[0],value[1])} style={{ fontSize: "14px" }} name="close"></ion-icon></span></span>
                     
                    })
                  }
                    <span className="filterDisplayMobile breadCrumb" onClick={()=>{this.table.clearAllfilter();this.setState({filters:[]})}} style={{ marginLeft: "45px", fontSize: "14px", color: "light-grey" }}>Clear all</span>
                  </Grid>

                  </div> 
                <AbsenceTable  decryptByDESModeCBC={this.props.decryptByDESModeCBC} encryptByDESModeCBC={this.props.encryptByDESModeCBC} sendFilterValue={this.sendFilterValue} onRef={ref => (this.table = ref)}  reason={reason} department={department} location={location}  apiCall={this.apiCall} />
                  
                

              </div>)} />
            <Route path="/dashboard/registration"  render={() => (<Registration decryptByDESModeCBC={this.props.decryptByDESModeCBC} encryptByDESModeCBC={this.props.encryptByDESModeCBC} apiCall={this.apiCall} department={department} location={location} />)} />
            <Route path="/dashboard/createAbsence"  render={(props) => (<CreateAbsence decryptByDESModeCBC={this.props.decryptByDESModeCBC} encryptByDESModeCBC={this.props.encryptByDESModeCBC} refreshRouter={this.refreshRouter}  props={props}  reason={reason} apiCall={this.apiCall} />)} />
            {/* added routing for ada request */}
            <Route path="/dashboard/ada"  render={(props) => (<AdaRequest decryptByDESModeCBC={this.props.decryptByDESModeCBC} encryptByDESModeCBC={this.props.encryptByDESModeCBC} refreshRouter={this.refreshRouter}  props={props}  adaRequest={adaRequest} apiCall={this.apiCall} />)} />
            <Route path="/dashboard/changePassword"  render={() => (<ChangePassword decryptByDESModeCBC={this.props.decryptByDESModeCBC} encryptByDESModeCBC={this.props.encryptByDESModeCBC} apiCall={this.apiCall}  />)} />
            <Route path="/dashboard/clockedData"  render={() => (<LeaveTable decryptByDESModeCBC={this.props.decryptByDESModeCBC} props={this.props} apiCall={this.apiCall}/>) } />
          </Grid>
                
        </Row>
  <FooterComponent/>  
      </Router>
    );
  }
}

export default withAlert()(Dashboard)
