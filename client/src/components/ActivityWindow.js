import React, { Component } from 'react';
import Grid from '@material-ui/core/Grid';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import rd3 from 'react-d3-library';

var moment = require('moment');

export default class ActivityWindow extends Component {
  constructor(props) {
    super(props);
  }

  createChart() {
    if (this.props.data != null && this.props.data.length > 0) {
      data.dataset = []
  
        console.log("im being called");
            for (var i = 0; i < this.props.data.length; i++) {
        data.dataset.push({label:this.props.data[i].idclockedIntimes, 
          value:this.props.data[i].hoursworked});
        }
      
      data.margins = {top: 20, right: 10, bottom: 0, left: 10};
      data.ticks = 11;
      data.barClass = "activity";
      data.yAxisLabel = 'Y VALUE';
      console.log(data);
      const bar = rd3.BarChart;
      bar.data = data;
        return bar;
      } else {
        return null;
      }
  }
  render() {
    const RD3Component = rd3.Component;
    var bar = this.createChart();
    let barchart;
    if  (bar==null) {
      barchart = false;
    } else {
      barchart = true;
    }
    return (<Modal show={this.props.showstate} size="lg">
          <svg viewBox="0 0 190 98">
              {barchart && }
          </svg>
        <Button variant="secondary" onClick={() => this.props.action()}>
      Close
    </Button>
    </Modal>
    )
  }
}
