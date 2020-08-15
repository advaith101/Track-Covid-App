import React, { Component, Fragment, useState } from 'react';
import { Container} from 'reactstrap';
import AssessmentIcon from '@material-ui/icons/Assessment';
import "../App.css";
import { AgGridReact } from "ag-grid-react";
import "ag-grid-community/dist/styles/ag-grid.css";
import "ag-grid-community/dist/styles/ag-theme-material.css";
import 'typeface-roboto';
import onlineCellRenderer from './onlineCellRenderer';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import ActivityWindow from './ActivityWindow';

class LeaveTable extends Component {
    constructor(props) {
        super(props);
    }


    state = {
        data:{},
        showModal:false,
        name:null,
        id:0,
        header : [
            { headerName: "Name", field: "name", editable:  false, cellRendererFramework: withIcon},
            { headerName: "Online", field: "status", editable:  false, cellRenderer: onlineCellRenderer},
            { headerName: "Department", field: "department", editable:  false},
            { headerName: "Location", field: "location", editable:  false}

        ],

        viewModels: [], // these are to be kept as our reset viewModels, do not modify
        filteredViewModels: [],
            components: {
        'onlineCellRenderer': onlineCellRenderer,
    	},
        defaultColDef: {
            editable: false,
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
    }


    //This attempts to get the values needed for the table and decrypts Name
    createViewModels() {
    	 var post_data = {
    		"companyid":window.localStorage.getItem("CompanyID")
    	}
     	var url = "timestamp/getOnlineStatus";

        this.props.apiCall(url, "POST", post_data, "")
            .then(res => {
                const data = res.data[0];
                console.log(data);
                var filterData = data.map((viewModel) => {
                    return {
                        "name":this.props.decryptByDESModeCBC(viewModel.Name),
                        "status":viewModel.Status,
                        "location": viewModel.locname,
                        "department": viewModel.depname,
                        "id": viewModel.UserID


                    }
                })
                this.setState({ viewModels : data, filteredViewModels: JSON.parse(JSON.stringify(filterData)) });

            }).catch(res => console.log(res));
         }
    
    createData = (id, name) => {
            this.setState({name:name})
            this.setState({id:id})
            this.setState({showModal:true});
            
    }
    //returns table with all of the necessary components and resizing
    leaveTable() {
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
                        gridOptions={{ rowHeight: 40, headerHeight: 40,}}
                        columnDefs={this.state.header}
                        rowData={this.state.filteredViewModels}
                        paginationAutoPageSize={true}
                        singleClickEdit={true}
                        pagination={true}
                        componets={this.state.components}
                        defaultColDef={this.state.defaultColDef}
                        createData={this.createData}
                        suppressHorizontalScroll={true}


                    ></AgGridReact>
                </div>
                {this.state.showModal && 
                    <ActivityWindow props={this.props} showstate={this.state.showModal} 
                    action={() => {this.setState({showModal:false});}} apiCall={this.props.apiCall}
                    person={this.state.name} id={this.state.id}/>}
            </Fragment>
        );
    }

    tableForType() {
        return this.leaveTable();
    }



    render() {
        return (<Container id="resizemeplease" style={{ width: "90%", marginTop: "10px" }}>
            {this.tableForType()}
           
        </Container>)



    }

}


export default LeaveTable;


class withIcon extends Component {
    constructor(props) {
        super(props)
    }
    render() {
        return (
            <div class="encloser">
                <AssessmentIcon onClick={(e) => { e.stopPropagation(); this.props.agGridReact.props.createData(this.props.data.id, this.props.data.name); }} class={"tableDeleteIcon"} style={{ marginRight: "10px", cursor: "pointer", color:"#788195" }} /> {this.props.value}
            </div>
        )
    }
}