import React from 'react'
import Button from '@material-ui/core/Button';
import * as FileSaver from 'file-saver';
import * as XLSX from 'xlsx';
import InsertDriveFileIcon from '@material-ui/icons/InsertDriveFile';
import DescriptionIcon from '@material-ui/icons/Description';
import template from '../assets/template.xlsx'

export const DownloadTemp = ({parent}) => {

    //template containing how to format the uploadable document.

    return (
        <label class="btn btn-default" style={{padding:0,margin:0,minWidth:0,marginLeft:"5px",marginRight:"5px"}} variant="warning"><a href={template} download="template.xlsx"><DescriptionIcon style={{color:"#547795"}} /></a></label >
    )
}