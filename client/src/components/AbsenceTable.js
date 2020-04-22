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
        this.isCurrentfilterValue = [];    
    }


    state = {
        header : [
            { headerName: "Name", field: "name", cellRendererFramework: withIcon, editable:  false},
            {
                headerName: "Leave Reason", field: "leavereason", cellEditor: "select", editable:function(value){
            if(value.data.isCurrent=="True")return true;else return false;}, cellEditorParams: {
                    // values: this.reasonValue   //this is not working: reasonValue seems to be undefined. I fixed it for now below:
                    values: ['EE Quarantine - not sick', 'EE Quarantine - sick', 'Other Quarantine - not sick', 'Other Quarantine - sick', 'School/Business Closure']
                }
            },
            { headerName: "Date of Absence", field: "dateOfAbsence", editable: false }, //need to make this editable only if absence is current, and need to make it work in backend.
            { headerName: "Location", field: "location", editable: false },
            { headerName: "Department", field: "department", editable: false },
            { headerName: "Current", field: "isCurrent", cellEditor: "select",hide:Number(window.localStorage.getItem("isAdmin"))?false:true, editable: true, cellEditorParams: {
                // values: this.reasonValue   //this is not working: reasonValue seems to be undefined. I fixed it for now below:
                values: ["True","False"]
            } }

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
        // if(Number(window.localStorage.getItem("isAdmin")))
        // {
        //     let header = JSON.parse(JSON.stringify(this.state.header));
        //     header.push({ headerName: "Current", field: "isCurrent", cellEditor: "select", editable: true, cellEditorParams: {
        //         // values: this.reasonValue   //this is not working: reasonValue seems to be undefined. I fixed it for now below:
        //         values: ["True","False"]
        //     } });
        //     this.setState({header})
        // }
        this.createViewModels();

    }

    componentWillUnmount() {
        this.props.onRef(undefined)
    }

    createViewModels() {
        var post_data = { "email":this.props.encryptByDESModeCBC( window.localStorage.getItem("email")) };
        var url = Number(window.localStorage.getItem("isAdmin")) ? "absence/getallabsence" : "absence/getabsence";
        this.props.apiCall(url, "POST", post_data, "")
            .then(res => {
                const data = res.data;
                var filterData = data.map((viewModel) => {
                    return {
                        "name":this.props.decryptByDESModeCBC(viewModel.name), "leavereason": viewModel.reasonName, "dateOfAbsence": viewModel.dateOfAbsence,
                        "location": viewModel.locationName, "department": viewModel.departmentName, "id": viewModel.AbsenceID,"isCurrent": (viewModel.isCurrent)?"True":"False",
                        "reasonId": viewModel.reasonID, "departmentId": viewModel.departmentID, "locationId": viewModel.locationID
                    }
                })
                this.setState({ viewModels: data, filteredViewModels: JSON.parse(JSON.stringify(filterData)) });

            }).catch(res => console.log(res));
          
    }

    excelData() {
        return this.getTabelDate().map(viewModel => {
            var date = viewModel.dateOfAbsence && viewModel.dateOfAbsence.split(" - ");
            return {
                name: viewModel.name,
                // email: viewModel.email,
                location: viewModel.location,
                department: viewModel.department,
                reason: viewModel.leavereason,
                startDate: (date)?date[0]:"",
                endDate: (date)?date[1]:"",
                 current: viewModel.isCurrent,
                // processed: 1
            }
        });

    }
    clearAllfilter=(value,index)=>{
        if(!index){        
            this.gridApi.setFilterModel(null);
        }
        else{
            var filter = this.gridApi.getFilterInstance(index);
            var filterModel = filter.getModel();
              if(!filterModel.condition1)  this.gridApi.destroyFilter(index);
              else{
                let final = [];
                if(filterModel.condition1.filter == value) final = filterModel.condition2 ; else final = filterModel.condition1;
                filter.setModel(final);
                this.gridApi.onFilterChanged();
              }
            
        }
    }
    // get  tabel data after sort and filter for print
    getTabelDate=()=>{
        var tableData = []
        this.gridApi && this.gridApi.forEachNodeAfterFilterAndSort( function(rowNode, index) {
             tableData.push(rowNode.data);
        })
        return tableData ;
    }
    filterDedect=(e)=>{        
        var filter = this.gridApi.getFilterModel();
        var result = [];
        for(let filterValue in filter){
            if(filter[filterValue].condition1){
                result.push([filter[filterValue].condition1.filter,filterValue]);
                result.push([filter[filterValue].condition2.filter,filterValue]);
            }
            else{
                result.push([filter[filterValue].filter,filterValue]);
            }
        }   
         this.props.sendFilterValue(result);
    }

    onCellValueChanged = event => {
        var oldDate = event.data.dateOfAbsence.split(" - ");
        if (event.newValue == event.oldValue) {
        }
        else {
            var post_data = {
                "absenceID": event.data.id, "email": "",
                "startDate": oldDate[0], "endDate": oldDate[1],
                "reasonID": event.data.reasonId, "isCurrent": (event.data.isCurrent=="True")?1:0, "isProcessed": 0, "createdBy": Number(window.localStorage.getItem("userId"))
            };
            if (event.colDef.field == "isCurrent") post_data["isCurrent"] = (event.newValue=="True")?1:0;
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
            if ( (event.colDef.field == "dateOfAbsence" && event.value.split(" - ")[1]) || event.colDef.field != "dateOfAbsence"  ) {
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
