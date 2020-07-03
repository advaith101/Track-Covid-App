import React from 'react'
import Button from '@material-ui/core/Button';
import * as FileSaver from 'file-saver';
import * as XLSX from 'xlsx';
import InsertDriveFileIcon from '@material-ui/icons/InsertDriveFile';
import PublishIcon from '@material-ui/icons/Publish';

export const ImportCSV = ({parent}) => {
    var hover = false;
     //Converts uploaded spreadsheet into insertable absences
//csvData : file to be converted
    const convertSpreadsheet = (csvData) => {
    if (csvData != null) {
        console.log(csvData)
      var moment = require('moment');
      var reader = new FileReader();
      console.log(csvData);
      
      reader.onload = (e) => {
        //converts csvData into a readable json object
        var data = new Uint8Array(e.target.result);
        var workbook = XLSX.read(data, {type:'array', cellDates:true});
        console.log(workbook);
        const wsname = workbook.SheetNames[0];
        const ws = workbook.Sheets[wsname];
        const absences = XLSX.utils.sheet_to_json(ws, {header:1,raw:false,dateNF:'yyyy-mm-dd'});

        //loops through and json object and inserts data into database
        for (var i = 1; i < absences.length; i++) {
          //checks to make sure that Start Date, email, name, and email id are indeed there
          if (absences[i][0] != null && absences[i][1] != null
            && absences[i][2] != null && absences[i][4] != null) {
              var post_data = {
                "name": parent.props.encryptByDESModeCBC(absences[i][1].toString()),
                "email": parent.props.encryptByDESModeCBC(absences[i][0].toString()),
                "startDate": moment(absences[i][2]).format("YYYY MM DD"),
                "endDate":  (absences[i][3] != null)?moment(absences[i][3]).format("YYYY MM DD"):"", "reasonID": absences[i][4], "isCurrent": 1, "isProcessed": 0, 
                "createdBy": Number(window.localStorage.getItem("userId")),
                "isCurrent":1
              };
              parent.apiCall("absence/insertabsence", "POST", post_data,"Absence record added successfully","Failed to add absence record");
          }
        }
      }
        reader.readAsArrayBuffer(csvData);
    }
    window.location.reload(false);  
  }

    return (
        <label class="btn btn-default" style={{padding:0,margin:0,minWidth:0,marginLeft:"5px",marginRight:"5px"}} variant="warning">
        <PublishIcon style={{color:"#547795"}}/><input type="file" onChange={(e) => convertSpreadsheet(e.target.files[0])} hidden/>
        </label >
    )
}