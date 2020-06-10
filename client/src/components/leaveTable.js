import React, { Component, Fragment } from 'react';
import { Container} from 'reactstrap';
import DeleteIcon from '@material-ui/icons/Delete';
import "../App.css";
import { AgGridReact } from "ag-grid-react";
import "ag-grid-community/dist/styles/ag-grid.css";
import "ag-grid-community/dist/styles/ag-theme-material.css";
import 'typeface-roboto';
import Brightness1Icon from '@material-ui/icons/Brightness1';

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
            { headerName: "Online", field: "status", cellRendererFramework: withIcon, editable:  false}

        ],
        viewModels: [], // these are to be kept as our reset viewModels, do not modify
        filteredViewModels: [],
        defaultColDef: {
            editable: true,
            sortable: true,
            flex: 1,
            minWidth: 100,
            filter: true,
            resizable: true,
        }
    }

    sizeToFit() {
        AgGridReact.api.sizeColumnsToFit();
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
    	post_data = {

    	}
        var url = "timestamp/getOnlineStatus";
        this.props.apiCall(url, "POST", post_data, "")
            .then(res => {
                const data = res.data;
                var filterData = data.map((viewModel) => {
                    return {
                        "name":this.props.decryptByDESModeCBC(viewModel.name), 
                        "status":viewModel.status
                    }
                })
                this.setState({ viewModels: data, filteredViewModels: JSON.parse(JSON.stringify(filterData)) });

            }).catch(res => console.log(res));
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
                        justifyContent: 'center', width: "auto"
                    }}
                >
                    <AgGridReact
                    suppressTouch={false}
                    suppressMovableColumns={true}
                        onGridReady={(params) => { params.api.sizeColumnsToFit(); this.gridApi = params.api;
                            window.addEventListener('resize', function() {
      setTimeout(function() {
        params.api.sizeColumnsToFit();
      });
        }); }}
                        gridOptions={{ rowHeight: 40, headerHeight: 40 }}
                        columnDefs={this.state.header}
                        rowData={this.state.filteredViewModels}
                        paginationAutoPageSize={true}
                        singleClickEdit={true}
                        pagination={true}
                        defaultColDef={this.state.defaultColDef}
                        deleteAbsence={this.deleteAbsence}
                        suppressHorizontalScroll={true}

                    ></AgGridReact>
                </div>
            </Fragment>
        );
    }

    tableForType() {
        return this.adminTable();
    }

    render() {
        return (<Container id="resizemeplease" style={{ width: "auto", marginTop: "10px" }}>
            {this.tableForType()}
        </Container>)


    }

}

export default AbsenceTable;
}
