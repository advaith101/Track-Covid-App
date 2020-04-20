import React, { Component, Fragment } from 'react';
import { Container} from 'reactstrap';
import DeleteIcon from '@material-ui/icons/Delete';
import "../App.css";
import { AgGridReact } from "ag-grid-react";
import "ag-grid-community/dist/styles/ag-grid.css";
import "ag-grid-community/dist/styles/ag-theme-material.css";
import 'typeface-roboto';

class AbsenceTable extends Component {
    constructor(props) {
        super(props);
        this.reasonValue = this.props.reason.data && this.props.reason.data.map(value => value.Name);
        this.leaveReasonfilterValue = [];
        this.absenceDatefilterValue = [];
        this.namefilterValue = [];
        this.departmentfilterValue = [];
        this.locationfilterValue = [];        
    }


    state = {
        header : [
            { headerName: "Name", field: "name", cellRendererFramework: withIcon, editable: window.localStorage.getItem("isAdmin") == 1 ? true : false},
            {
                headerName: "Leave Reason", field: "leavereason", cellEditor: "select", editable: true, cellEditorParams: {
                    // values: this.reasonValue   //this is not working: reasonValue seems to be undefined. I fixed it for now below:
                    values: ['EE Quarantine - not sick', 'EE Quarantine - sick', 'Other Quarantine - not sick', 'Other Quarantine - sick', 'School/Business Closure']
                }
            },
            { headerName: "Date of Absence", field: "dateOfAbsence", editable: false }, //need to make this editable only if absence is current, and need to make it work in backend.
            { headerName: "Location", field: "location", editable: false },
            { headerName: "Department", field: "department", editable: false }


        ],
        viewModels: [], // these are to be kept as our reset viewModels, do not modify
        filteredViewModels: [],
        employeeViewModels: [],
        defaultColDef: {
            editable: true,
            sortable: true,
            flex: 1,
            minWidth: 100,
            filter: true,
            resizable: true,
        }
    }


    componentDidMount() {
        this.props.onRef(this);
        this.createViewModels();

    }

    componentWillUnmount() {
        this.props.onRef(undefined)
    }

    createViewModels() {
        var post_data = { "email": window.localStorage.getItem("email") };
        var url = Number(window.localStorage.getItem("isAdmin")) ? "absence/getallabsence" : "absence/getabsence";
        this.props.apiCall(url, "POST", post_data, "")
            .then(res => {
                const data = res.data;
                var filterData = data.map((viewModel) => {
                    return {
                        "name": viewModel.name, "leavereason": viewModel.reasonName, "dateOfAbsence": viewModel.dateOfAbsence,
                        "location": viewModel.locationName, "department": viewModel.departmentName, "id": viewModel.AbsenceID,
                        "reasonId": viewModel.reasonID, "departmentId": viewModel.departmentID, "locationId": viewModel.locationID
                    }
                })
                this.setState({ viewModels: data, filteredViewModels: JSON.parse(JSON.stringify(filterData)) });

            }).catch(res => console.log(res));
          
    }

    excelData() {
        // console.log(this.state.filteredViewModels)
        return this.state.filteredViewModels.map(viewModel => {
            var date = viewModel.dateOfAbsence && viewModel.dateOfAbsence.split(" - ");
            return {
                name: viewModel.name,
                // email: viewModel.email,
                location: viewModel.location,
                department: viewModel.department,
                reason: viewModel.leavereason,
                startDate: (date)?date[0]:"",
                endDate: (date)?date[1]:"",
                // current: 1,
                // processed: 1
            }
        });

    }
    clearAllfilter=(value,index)=>{
 
        if(!index){
        this.gridApi.destroyFilter('leavereason');
        this.gridApi.destroyFilter('dateOfAbsence');
        this.gridApi.destroyFilter('name');
        this.gridApi.destroyFilter('location');
        this.gridApi.destroyFilter('department');
        }
        else{
            if(index == 1){
              if(this.leaveReasonfilterValue.length==1)  this.gridApi.destroyFilter('leavereason');
              else{
                var leaveReasonfilter = this.gridApi.getFilterInstance("leavereason");
                let leaveReasonfinal = this.leaveReasonfilterValue.filter(filterValue=>{
                    if(filterValue.filter == value) return false ; else return true;
                })
                leaveReasonfilter.setModel({
                    filter: leaveReasonfinal[0].filter,
                    filterType: leaveReasonfinal[0].filterType,
                    type: leaveReasonfinal[0].type
                })
                this.gridApi.onFilterChanged();
              }
            }
            else if(index == 2){
                if(this.absenceDatefilterValue.length==1)  this.gridApi.destroyFilter('dateOfAbsence');
                else{
                  var absencefilter = this.gridApi.getFilterInstance("dateOfAbsence");
                  let absencefinal = this.absenceDatefilterValue.filter(filterValue=>{
                      if(filterValue.filter == value) return false ; else return true;
                  })
                  absencefilter.setModel({
                      filter: absencefinal[0].filter,
                      filterType: absencefinal[0].filterType,
                      type: absencefinal[0].type
                  })
                  this.gridApi.onFilterChanged();
                }
            }
            else if(index == 3){
                if(this.departmentfilterValue.length==1)  this.gridApi.destroyFilter('department');
                else{
                  var departmentfilter = this.gridApi.getFilterInstance("department");
                  let departmentfinal = this.departmentfilterValue.filter(filterValue=>{
                      if(filterValue.filter == value) return false ; else return true;
                  })
                  departmentfilter.setModel({
                      filter: departmentfinal[0].filter,
                      filterType: departmentfinal[0].filterType,
                      type: departmentfinal[0].type
                  })
                  this.gridApi.onFilterChanged();
                }
            }
            else if(index == 4){
                if(this.locationfilterValue.length==1)  this.gridApi.destroyFilter('location');
                else{
                  var locationfilter = this.gridApi.getFilterInstance("location");
                  let locationfinal = this.locationfilterValue.filter(filterValue=>{
                      if(filterValue.filter == value) return false ; else return true;
                  })
                  locationfilter.setModel({
                      filter: locationfinal[0].filter,
                      filterType: locationfinal[0].filterType,
                      type: locationfinal[0].type
                  })
                  this.gridApi.onFilterChanged();
                }
            }
            else if(index == 5){
                if(this.namefilterValue.length==1)  this.gridApi.destroyFilter('name');
                else{
                  var namefilter = this.gridApi.getFilterInstance("name");
                  let namefinal = this.namefilterValue.filter(filterValue=>{
                      if(filterValue.filter == value) return false ; else return true;
                  })
                  namefilter.setModel({
                      filter: namefinal[0].filter,
                      filterType: namefinal[0].filterType,
                      type: namefinal[0].type
                  })
                  this.gridApi.onFilterChanged();
                }
            }
            else{}
        }
    }
    filterDedect=(e)=>{        
        var leaveReasonfilter = this.gridApi.getFilterInstance("leavereason");
        var absenceDatefilter = this.gridApi.getFilterInstance("dateOfAbsence");
        var namefilter = this.gridApi.getFilterInstance("name");
        var locationfilter = this.gridApi.getFilterInstance("location");
        var departmentfilter = this.gridApi.getFilterInstance("dapartment");
        // leaveReasonfilter;
        var colNo = 0 ;
        var leaveReasonCheck=[];
        var absenceCheck=[];
        var departmentCheck=[];
        var locationCheck=[];
        var nameCheck=[];
        if(leaveReasonfilter && leaveReasonfilter.getModel()) {   
              if(leaveReasonfilter.getModel().condition1){
                if(!this.leaveReasonfilterValue[0] || !this.leaveReasonfilterValue[1] || this.leaveReasonfilterValue[0].filter!= leaveReasonfilter.getModel().condition1.filter || this.leaveReasonfilterValue[1].filter!= leaveReasonfilter.getModel().condition2.filter) {
                    this.leaveReasonfilterValue=[leaveReasonfilter.getModel().condition1,leaveReasonfilter.getModel().condition2];
                    colNo = 1;
                }
            }
            else{
                if( !this.leaveReasonfilterValue[0] || this.leaveReasonfilterValue[0].filter != leaveReasonfilter.getModel().filter ){
                this.leaveReasonfilterValue = [leaveReasonfilter.getModel()];
                colNo = 1;
                }
                else{
                    if(!leaveReasonfilter.getModel().condition1 && (this.leaveReasonfilterValue.length==2)){
                        this.leaveReasonfilterValue = [leaveReasonfilter.getModel()];
                    colNo = 1;
                    }
                }
            } 
        }
        else{
            leaveReasonCheck=[];
        }

        if(colNo == 0){
            if(absenceDatefilter && absenceDatefilter.getModel()) {    
                if(absenceDatefilter.getModel().condition1){
                  if(!this.absenceDatefilterValue[0] || !this.absenceDatefilterValue[1] || this.absenceDatefilterValue[0].filter!= absenceDatefilter.getModel().condition1.filter || this.absenceDatefilterValue[1].filter!= absenceDatefilter.getModel().condition2.filter) {
                      this.absenceDatefilterValue=[absenceDatefilter.getModel().condition1,absenceDatefilter.getModel().condition2];
                      colNo = 2;
                  }
              }
              else{
                  if(!this.absenceDatefilterValue[0] || this.absenceDatefilterValue[0].filter != absenceDatefilter.getModel().filter ){
                  this.absenceDatefilterValue = [absenceDatefilter.getModel()];
                  colNo = 2;
                  }
                  else{
                    if(!absenceDatefilter.getModel().condition1 && (this.absenceDatefilterValue.length==2)){
                        this.absenceDatefilterValue = [absenceDatefilter.getModel()];
                    colNo = 2;
                    }
                }
              } 
          }
          else{
            absenceCheck = [];
          }
        }
        if(colNo == 0){
            if(departmentfilter && departmentfilter.getModel()) {    
                if(departmentfilter.getModel().condition1){
                  if(!this.departmentfilterValue[0] || !this.departmentfilterValue[1] || this.departmentfilterValue[0].filter!= departmentfilter.getModel().condition1.filter || this.departmentfilterValue[1].filter!= departmentfilter.getModel().condition2.filter) {
                      this.departmentfilterValue=[departmentfilter.getModel().condition1,departmentfilter.getModel().condition2];
                      colNo = 3;
                  }
              }
              else{
                  if(!this.departmentfilterValue[0] || this.departmentfilterValue[0].filter != departmentfilter.getModel().filter ){
                  this.departmentfilterValue = [departmentfilter.getModel()];
                  colNo = 3;
                  }
                  else{
                    if(!departmentfilter.getModel().condition1 && (this.departmentfilterValue.length==2)){
                        this.departmentfilterValue = [departmentfilter.getModel()];
                    colNo = 3;
                    }
                }
              } 
          }
          else {
            departmentCheck = [];
          }
        }
        if(colNo == 0){
            if(locationfilter && locationfilter.getModel()) {    
                if(locationfilter.getModel().condition1){
                  if(!this.locationfilterValue[0] || !this.locationfilterValue[1] || this.locationfilterValue[0].filter!= locationfilter.getModel().condition1.filter || this.locationfilterValue[1].filter!= locationfilter.getModel().condition2.filter) {
                      this.locationfilterValue=[locationfilter.getModel().condition1,locationfilter.getModel().condition2];
                      colNo = 4;
                  }
              }
              else{
                  if(!this.locationfilterValue[0] || this.locationfilterValue[0].filter != locationfilter.getModel().filter ){
                  this.locationfilterValue = [locationfilter.getModel()];
                  colNo = 4;
                  }
                  else{
                    if(!locationfilter.getModel().condition1 && (this.locationfilterValue.length==2)){
                        this.locationfilterValue = [locationfilter.getModel()];
                    colNo = 4;
                    }
                }
              } 
          }
          else{
            locationCheck = [];
          }
        }
        if(colNo == 0){
            if(namefilter && namefilter.getModel()) {    
                if(namefilter.getModel().condition1){
                  if(!this.namefilterValue[0] || !this.namefilterValue[1] || this.namefilterValue[0].filter!= namefilter.getModel().condition1.filter || this.namefilterValue[1].filter!= namefilter.getModel().condition2.filter) {
                      this.namefilterValue=[namefilter.getModel().condition1,namefilter.getModel().condition2];
                      colNo = 5;
                  }
              }
              else{
                  if(!this.namefilterValue[0] || this.namefilterValue[0].filter != namefilter.getModel().filter ){
                  this.namefilterValue = [namefilter.getModel()];
                  colNo = 5;
                  }
                  else{
                    if(!namefilter.getModel().condition1 && (this.namefilterValue.length==2)){
                        this.namefilterValue = [namefilter.getModel()];
                    colNo = 5;
                    }
                }
              } 
          }
          else {
            nameCheck = [] ;
          }
        }
        
        
        if(colNo == 1) this.props.sendFilterValue(this.leaveReasonfilterValue,1)
        else if(colNo == 2) this.props.sendFilterValue(this.absenceDatefilterValue,2)
        else if(colNo == 3) this.props.sendFilterValue(this.departmentfilterValue,3)
        else if(colNo == 4) this.props.sendFilterValue(this.locationfilterValue,4)
        else if(colNo == 5) this.props.sendFilterValue(this.namefilterValue,5)
        else{
            if((this.leaveReasonfilterValue.length != leaveReasonCheck.length) && (!leaveReasonfilter.getModel())) {
                this.props.sendFilterValue([],1);
                this.leaveReasonfilterValue = [];
            }
            else if(this.absenceDatefilterValue.length != absenceCheck.length && !absenceDatefilter.getModel()) {
                this.props.sendFilterValue([],2);
                this.absenceDatefilterValue = [];
            }
            else if(this.departmentfilterValue.length != departmentCheck.length && !departmentfilter.getModel()) {
                this.props.sendFilterValue([],3);
                this.departmentfilterValue = [];
            }
            else if(this.locationfilterValue.length != locationCheck.length && !locationfilter.getModel()) {
                this.props.sendFilterValue([],4);
                this.locationfilterValue = [];
            }
            else if(this.namefilterValue.length != nameCheck.length && !namefilter.getModel()) {
                this.props.sendFilterValue([],5);
                this.namefilterValue = [];
            }
            else{}
        }
    }

    onCellValueChanged = event => {
        console.log(event.data)
        var oldDate = event.data.dateOfAbsence.split(" - ");
        if (event.newValue == event.oldValue) {
        }
        else {
            var post_data = {
                "absenceID": event.data.id, "email": "janet@jackson.com",
                "startDate": oldDate[0], "endDate": oldDate[1],
                "reasonID": event.data.reasonId, "isCurrent": 1, "isProcessed": 0, "createdBy": Number(window.localStorage.getItem("userId"))
            };
            console.log(post_data)
            if (event.colDef.field == "name") post_data["name"] = event.newValue;
            else if (event.colDef.field == "leavereason") post_data["reasonID"] = this.props.reason.data.filter(value => { if (value.Name == event.newValue) return true; else return false })[0].ReasonID;
            else {
                var date = event.value.split(" - ");
                if (!date[1]) {
                    alert("check the date Format");
                }
                else {
                    post_data["startDate"] = event.newValue;
                    post_data["endDate"] = event.newValue
                }
            }
            if (event.value.split(" - ")[1] || event.colDef.field != "dateOfAbsence") {
                this.props.apiCall("absence/updateabsence", "POST", post_data, "Absence record updated successfully","Failed to update absence record")
            }

        }
    }

    externalFilterChanged = (value) => {
        this.gridApi.setQuickFilter(value);
    }

    adminTable() {

        return (
            <Fragment>

                <div
                    class="ag-theme-material"
                    style={{
                        height: "65vh",
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center', width: "100%"
                    }}
                >
                    <AgGridReact
                    suppressTouch={false}
                    suppressMovableColumns={true}
                        onGridReady={(params) => { params.api.sizeColumnsToFit(); this.gridApi = params.api; }}
                        gridOptions={{ rowHeight: 40, headerHeight: 40 }}
                        columnDefs={this.state.header}
                        onCellValueChanged={this.onCellValueChanged}
                        rowData={this.state.filteredViewModels}
                        paginationAutoPageSize={true}
                        singleClickEdit={true}
                        pagination={true}
                        defaultColDef={this.state.defaultColDef}
                        deleteAbsence={this.deleteAbsence}
                        onFilterChanged={this.filterDedect}
                    ></AgGridReact>
                </div>
            </Fragment>
        );
    }

    tableForType() {
        return this.adminTable();
    }
    deleteAbsence = (id) => {
        var post_data = { "absenceID": id }
        this.props.apiCall("absence/deleteabsence", "POST", post_data, "Absence record deleted successfully","Failed to delete absence record").then(res => {
            if (res.status == "ok") {
                var filteredResult = this.state.filteredViewModels.filter(value => {
                    if (value.id == id) return false;
                    else return true;
                })
                this.setState({ filteredViewModels: filteredResult });
                this.gridApi.setRowData(filteredResult);
            }
        })
    }

    render() {
        return (<Container style={{ width: "100%", marginTop: "10px" }}>
            {this.tableForType()}
        </Container>)


    }

}

export default AbsenceTable;


class withIcon extends Component {
    constructor(props) {
        super(props)
    }
    render() {
        return (
            <div class="encloser">
                <DeleteIcon onClick={(e) => { e.stopPropagation(); this.props.agGridReact.props.deleteAbsence(this.props.data.id); }} class={"tableDeleteIcon"} style={{ marginRight: "10px", cursor: "pointer", color:"#788195" }} /> {this.props.value}
            </div>
        )
    }
}
