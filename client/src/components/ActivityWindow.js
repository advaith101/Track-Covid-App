import React, { Component } from 'react';
import Grid from '@material-ui/core/Grid';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import * as d3 from 'd3';
import Tooltip from '@material-ui/core/Tooltip';
var moment = require('moment');

export default class ActivityWindow extends Component {
  constructor(props) {
    super(props);

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
        this.createChart();


    }
  createChart() {
    
    console.log("I'm being created! createChart yay!")
      var margin = { top: 50, right: 50, bottom: 60, left: 50 },
        width  = 1000 - margin.left - margin.right,
        height = 710 - margin.top  - margin.bottom;
  // Make x scale
      var data = this.props.data;
      console.log(data);
      var dates = [];
      for (var i = data.length - 1; i >= 0; i--) {
          dates.push(data[i].dateclocked);
      }
  
      var hours = [];
      for (var i = data.length - 1; i >= 0; i--) {
         hours.push(data[i].hoursworked);
       }

    var xScale = d3.scaleBand()
        .domain(dates)
        .rangeRound([0, width])
        .padding(0.1);
        


    // Make y scale, the domain will be defined on bar update
        var yScale = d3.scaleLinear()
        .domain([0,12])
        .range([height, 0]);

    // Create canvas
        var canvas = d3.select("#vis-container")
            .append("svg")
              .attr("id", "barchart")
              .attr("width",  width  + margin.left + margin.right)
              .attr("height", height + margin.top  + margin.bottom)
              
            .append("g")
              .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

     // Make x-axis and add to canvas
        var xAxis = d3.axisBottom()
                  .scale(xScale)

      canvas.append("g")
                   .attr("class", "x axis")
                   .style("font-size", "16")
                    .attr("transform", "translate(0," + height + ")")
                    .call(xAxis);

      // Make y-axis and add to canvas
                var yAxis = d3.axisLeft()
                    .scale(yScale)

                var yAxisHandleForUpdate = canvas.append("g")
                    .attr("class", "y axis")
                    .style("font-size", "14")
                    .call(yAxis);

                      var bars = canvas.selectAll(".bar")
                        .data(data)
                        .enter()
                        .append("rect")
                        .attr("class", "bar")
                        .attr("x", function(d,i) { return xScale( dates[i] ); })
                        .attr("width", xScale.bandwidth())
                        .attr("y", function(d,i) { return yScale(hours[i]); })
                        .attr("height", function(d,i) { return height - yScale(hours[i]) })
                        .on("mouseover", function() {
                              tooltip
                              .transition()
                              .duration(200)
                              .style("opacity", 1);
                              tooltip
                              .style("left", function(d,i) { return xScale(dates[i]) + "px"; })
                              .style("top",  function(d,i) { return yScale(hours[i]) + "px"; })
                        })
                        .on("mouseout", function() {
                              tooltip
                              .transition()
                              .duration(200)
                              .style("opacity", 0);})
      canvas.append("text")
      .attr("transform", "rotate(-90)")
      .attr("y", 0 - margin.left)
      .attr("x",0 - (height / 2))
      .attr("dy", "1em")
      .style("text-anchor", "middle")
      .style("font-size", "20")
      .text("Hours Worked");   
      canvas.append("text")             
      .attr("transform",
            "translate(" + (width/2 - 50) + " ," + 
                           (height + 40) + ")")
      .text("Date of Clock-In");     
    var tooltip = d3.select("#vis-container")
    .append("div")
      .style("opacity", 0)
      .attr("class", "tooltip")
      .style("background-color", "black")
      .style("border-radius", "5px")
      .style("padding", "10px")
      .style("position", "absolute")
      .style("color", "white")
      .text("")

 

  }


  destroyChart() {
     var elem = document.getElementById("barchart");
     if(elem != null) {
        elem.parentNode.removeChild(elem);
     }
  }

  render() {
    return (<Modal show={this.props.showstate} size="xl">
            <div  id="vis-container" style={{width:"100%", height:"110%"}}/>
      <Button variant="secondary" onClick={() => {this.props.action(); this.destroyChart()}}>
      Close
    </Button>
    </Modal>
    )
  }
}