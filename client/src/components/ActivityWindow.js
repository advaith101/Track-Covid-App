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
      var clockedin = [];
      for (var i = data.length - 1; i >= 0; i--) {
          clockedin.push(data[i].clockin);
      }
      var clockedout = [];
      for (var i = data.length - 1; i >= 0; i--) {
          clockedout.push(data[i].clockout);
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
                        .style("fill", "#006b6a")
                        .on("mouseover", function(d,i) {
                              tooltip.html(
                                 "<text style=\"font-size:20px\"> Date Clocked in: <br/>" + dates[i] + "<br/>" 
                                + "Hours Worked: <br/>" + hours[i] + "<br />"
                                + "Time Clocked in: <br/>" + clockedin[i] + "<br/>"
                                + "Time Clocked out: <br/>" + clockedout[i] + "<br/></text>");
                              tooltip.style("background-color", "#006b6a");
                              tooltip.transition().duration(300).delay(400).style("background-color", "#212529");
                              d3.select(this).style("fill", "#212529");
                                
                        })
                        .on("mouseout",  function(d,i) {
                          d3.select(this).transition().duration(300).style("fill", "#006b6a");
                        });
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
                      
                        canvas.append("text")             
                          .attr("transform",
                                "translate(" + (width/2) + " ," + 
                                               (10) + ")")
                          .text(this.props.person)
                          .style("font-size", "25");  

                      var tooltip = d3.select("#vis-container")
                        .append("g")
                        .style("opacity", 1)
                        .attr("class", "tooltip")
                        .style("background-color", "#006b6a")
                        .style("border-radius", "5px")
                        .style("padding", "10px")
                        .style("position", "absolute")
                        .style("color", "white")
                        .style("left", "950px")
                        .style("top", "10px")
                        .html( "<text style=\"font-size:20px\"> Date Clocked in: <br/><br/>" 
                                + "Hours Worked: <br/><br />"
                                + "Time Clocked in: <br/><br/>"
                                + "Time Clocked out: <br/><br/></text>")

 

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