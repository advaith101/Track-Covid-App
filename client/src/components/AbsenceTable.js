import React, { Component, Fragment } from 'react';
import { Container} from 'reactstrap';
import DeleteIcon from '@material-ui/icons/Delete';
import "../App.css";
import { AgGridReact } from "ag-grid-react";
import "ag-grid-community/dist/styles/ag-grid.css";
import "ag-grid-community/dist/styles/ag-theme-material.css";
import 'typeface-roboto';
import { AllModules } from '@ag-grid-enterprise/all-modules';

class AbsenceTable extends Component {
    constructor(props) {
        super(props);
    }


    state = {
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
        this.props.apiCall("absence/getabsence", "POST", post_data, "get absence ")
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
        return this.state.filteredViewModels.map(viewModel => {
            var date = viewModel.dateOfAbsence.split(" - ");
            return {
                name: viewModel.name,
                email: viewModel.id,
                location: viewModel.location,
                department: viewModel.department,
                reason: viewModel.reason,
                startDate: date[0],
                endDate: date[1],
                current: 1,
                processed: 1
            }
        });

    }
 

    handleFiltering(filterQuery) {
        this.updateFilteredViewModels(filterQuery);
    }


    onCellValueChanged = event => {
        var oldDate = event.data.dateOfAbsence.split(" - ");
        if (event.newValue == event.oldValue) {
        }
        else {
            var post_data = {
                "absenceID": event.data.id, "email": "janet@jackson.com",
                "startDate": oldDate[0], "endDate": oldDate[1],
                "reasonID": event.data.reasonId, "isCurrent": 1, "isProcessed": 0, "createdBy": Number(window.localStorage.getItem("userId"))
            };
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
                this.props.apiCall("absence/updateabsence", "POST", post_data, " update absence")
            }

        }
    }

    externalFilterChanged = (value) => {
        this.gridApi.setQuickFilter(value);
    }

    adminTable() {

        var reasonValue = this.props.reason.data && this.props.reason.data.map(value => value.Name);
        const header = [
            { headerName: "Name", field: "name", cellRendererFramework: withIcon },
            {
                headerName: "Leave Reason", field: "leavereason", cellEditor: "select", editable: true, cellEditorParams: {
                    values: reasonValue
                }
            },
            { headerName: "Date of Absence", field: "dateOfAbsence", editable: false  },
            { headerName: "Location", field: "location", editable: false },
            { headerName: "Department", field: "department", editable: false }


        ]
        return (
            <Fragment>

                <div
                    className="ag-theme-material"
                    style={{
                        height: "65vh",
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center', width: "100%"
                    }}
                >
                    <AgGridReact
                        onGridReady={(params) => { params.api.sizeColumnsToFit(); this.gridApi = params.api; }}
                        gridOptions={{ rowHeight: 40, headerHeight: 40 }}
                        columnDefs={header}
                        onCellValueChanged={this.onCellValueChanged}
                        rowData={this.state.filteredViewModels}
                        paginationAutoPageSize={true}
                        singleClickEdit={true}
                        pagination={true}
                        defaultColDef={this.state.defaultColDef}
                        modules={AllModules}
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
        this.props.apiCall("absence/deleteabsence", "POST", post_data, " delete absence").then(res => {
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
                <DeleteIcon onClick={(e) => { e.stopPropagation(); this.props.agGridReact.props.deleteAbsence(this.props.data.id); }} class="tableDeleteIcon" style={{ marginRight: "10px", cursor: "pointer", color: "#547795" }} /> {this.props.value}
            </div>
        )
    }
}
