import React, { Component } from 'react'
import Button from '@material-ui/core/Button';
import * as FileSaver from 'file-saver';
import * as XLSX from 'xlsx';
import InsertDriveFileIcon from '@material-ui/icons/InsertDriveFile';
import DescriptionIcon from '@material-ui/icons/Description';
import template from '../assets/template.xlsx'

class DownloadTemp extends Component {
  constructor(props) {
    super(props);
    this.state = {
      hover:false
    }
    this.handleHover.bind(this);
  }


  handleHover() {
    this.state.hover = !this.state.hover;
    
  }

    //template containing how to format the uploadable document.

  render() {
        return (
        <label class="btn btn-default" style={{padding:0,margin:0,minWidth:0,marginLeft:"5px",marginRight:"5px"}} variant="warning">
        <a href={template} download="template.xlsx" onMouseEnter={this.handleHover()} onMouseLeave={this.handleHover()}><DescriptionIcon style={{color:"#547795"}} /></a>
        
        </label>
    )
  }
} export default DownloadTemp;
