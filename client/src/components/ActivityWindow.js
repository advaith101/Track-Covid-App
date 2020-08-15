import React, { Component } from 'react';
import Grid from '@material-ui/core/Grid';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import * as d3 from 'd3';
import Tooltip from '@material-ui/core/Tooltip';
import ButtonGroup from "@material-ui/core/ButtonGroup"
import 'date-fns';
import {format} from 'date-fns';
import "./registration.css";
import DateFnsUtils from '@date-io/date-fns';
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker,
} from '@material-ui/pickers';
var moment = require('moment');

export default class ActivityWindow extends Component {
  constructor(props) {
    super(props);
    this.state = {
      startdate:'2020-03-05',
      showdate:false
    }

  }
    componentDidMount() {
         /*    <MuiPickersUtilsProvider utils={DateFnsUtils} style={{ width: "70%" }}>
              <KeyboardDatePicker
                style={{ width: "70%" }}
                disableToolbar
                variant="inline"
                format="MM/dd/yyyy"
                margin="normal"
                id="date-picker-inline"
                autoOk={true}
                label="Start Date"
                value={startDate}
                onChange={(e) => this.setState({ startDate: e })}
                KeyboardButtonProps={{
                  'aria-label': 'change date',
                }}
              />
            </MuiPickersUtilsProvider> */
        // }
        this.createChart();

    }

  createChart() {
          var margin = { top: 50, right: 50, bottom: 60, left: 50 },
        width  = 1000 - margin.left - margin.right,
        height = 1200 - margin.top  - margin.bottom;
    var canvas = d3.select("#vis-container")
            .append("svg")
            .attr("id", "chartcontainer")
              .attr("width",  width  + margin.left + margin.right)
              .attr("height", height + margin.top  + margin.bottom);



                canvas.append("text")             
                          .attr("transform",
                                "translate(" + (width/2 - 70) + " ," + 
                                               (50) + ")")
                          .text(this.props.person + " Productivity Score: 56")
                          .style("font-size", "25");  

              this.createChartWeekly();
            
  }
  createChartWeekly() {
    var post_data = { "UserID": this.props.id,
                        "companyID": window.localStorage.getItem("CompanyID") 
                    };

    this.props.apiCall("timestamp/getActivity", "POST", post_data)
        .then(res => {
      var margin = { top: 50, right: 50, bottom: 60, left: 50 },
        width  = 1000 - margin.left - margin.right,
        height = 710 - margin.top  - margin.bottom;
  // Make x scale
      var data = res.data;
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
        var canvas = d3.select("#chartcontainer")
              .append("g")
              .attr("id", "barchart")
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
                      

                      var tooltip = d3.select("#vis-container")
                        .append("g")
                        .style("opacity", 1)
                        .attr("class", "tooltip")
                        .attr("id", "tool")
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
 
            });
          }

  createDailyChart() {
    console.log(this.state.startdate);
        var post_data = { "UserID": this.props.id,
                        "companyID": window.localStorage.getItem("CompanyID"),
                          "date" : '\'' + this.state.startdate + '\''
                    };


    this.props.apiCall("timestamp/getActivityday", "POST", post_data)
        .then(res => {
      var margin = { top: 50, right: 50, bottom: 60, left: 50 },
        width  = 1000 - margin.left - margin.right,
        height = 710 - margin.top  - margin.bottom;
  // Make x scale
      var data = res.data;
      console.log(data);
      var hours = [1,2,3,4,5,6,7];
        var xScale = d3.scaleBand()
         .domain(hours)
         .rangeRound([0, width])
         .padding(0.1);

      
  

       var productivity = [];
       for (var i = data.length - 1; i >= 0; i--) {
           productivity.push(data[i].size);
       }
    //   var clockedout = [];
    //   for (var i = data.length - 1; i >= 0; i--) {
    //       clockedout.push(data[i].clockout);
    //   }

      var tasks = [];
       for (var i = data.length - 1; i >= 0; i--) {
           tasks.push(data[i].task);
       }    


    // Make y scale, the domain will be defined on bar update
         var yScale = d3.scaleLinear()
         .domain([0,100])
         .range([height, 0]);

    // Create canvas
         var canvas = d3.select("#chartcontainer")
               .append("g")
               .attr("id", "barchart")
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

          if(data.length > 0) {
              var random = 4;


              canvas.append("path")
              .datum(data)
              .attr("fill", "none")
                .attr("stroke", "#69b3a2")
               .attr("stroke-width", 1.5)
              .attr("d", d3.line()
               .x(function(d,i) { return xScale(hours[i]) + 54 })
                .y(function(d,i) { return yScale(productivity[i] * random) })
                  )


            var bars = canvas.selectAll("dot")
                        .data(data)
                        .enter()
                        .append("circle")
                        .attr("class", "circle")
                        .attr("cx", function(d,i) { 
                            return xScale(hours[i]) + 54})
                        .attr("r", "15")
                        .attr("cy", function(d,i) { return yScale(productivity[i] * random); })
                        .style("fill", "#006b6a")
                        .on("mouseover", function(d,i) {
                              // tooltip.html(
                              //    "<text style=\"font-size:20px\"> Date Clocked in: <br/>" + hours[i] + "<br/>" 
                              //   + "Hours Worked: <br/>" + hours[i] + "<br />"
                              //   + "Time Clocked in: <br/>" + clockedin[i] + "<br/>"
                              //   + "Time Clocked out: <br/>" + clockedout[i] + "<br/></text>");
                              // tooltip.style("background-color", "#006b6a");
                              // tooltip.transition().duration(300).delay(400).style("background-color", "#212529");
                              d3.select(this).style("fill", "#212529");
                                
                        })
                        .on("mouseout",  function(d,i) {
                          d3.select(this).transition().duration(300).style("fill", "#006b6a");
                        });

                  }  else {
                      canvas.append("text").attr("transform",
                                "translate(" + (width/2 - 50) + " ," + 
                                               ( 400) + ")")
                          .text("No Data to display");
                  }                 

                        canvas.append("text")
                          .attr("transform", "rotate(-90)")
                          .attr("y", 0 - margin.left)
                          .attr("x",0 - (height / 2))
                          .attr("dy", "1em")
                          .style("text-anchor", "middle")
                          .style("font-size", "20")
                          .text("productivity");   
                        
                        canvas.append("text")             
                          .attr("transform",
                                "translate(" + (width/2 + 90) + " ," + 
                                               (height + 40) + ")")
                          .text("Hours Worked");     
                      

                      var tooltip = d3.select("#vis-container")
                        .append("g")
                        .style("opacity", 1)
                        .attr("class", "tooltip")
                        .attr("id", "tool")
                        .style("background-color", "#006b6a")
                        .style("border-radius", "5px")
                        .style("position", "absolute")
                        .style("padding", "10px")
                        .style("color", "white")
                        .style("left", "50px")
                        .style("width","850px" )
                        .style("top", "710px")
                        .html( "<text style=\"font-size:20px\"> Activity Log:<br/>" 
                                + "Clocked in on 07/06/2020 at 8:21 AM <br/>"
                                + "Idle  at 9:13 AM<br/>"
                                + "Back Online at 9:26 AM<br/>"
                                + "Viewing non-work related content at 9:57 AM<br/>"
                                + "Completed various tasks at 12:06 PM<br/>"
                                + "Viewing non-work related content at 1:16 PM<br/>"
                                + "Idle at 1:34 PM<br/>"
                                + "Back online at 2:31 PM<br/>"
                                + "Clocked out at 3:29 PM")
 
            });
      } 
  

  makedaily() {
    this.destroyChart();
    this.createDailyChart();
  }
  destroyChart() {
    console.log(this.state.startdate);
     var elem = document.getElementById("barchart");
     if(elem != null) {
        elem.parentNode.removeChild(elem);
     }
      var tool = document.getElementById("tool");
     if(tool != null) {
        tool.parentNode.removeChild(tool);
     }

  }
  makeweekly() {
    this.destroyChart();
    this.createChartWeekly();
  }

  render() {
    const {startdate} = this.state;
    return (<Modal show={this.props.showstate} size="xl">
            <div  id="vis-container" style={{width:"100%", height:"110%"}}>
            <ButtonGroup color="primary" aria-label="outlined primary button group" orientation="vertical" 
              style={{position:"absolute", right :"5%", top:"40%", align:"right"}}>
            
              <Button  variant="secondary" onClick={() => {this.makedaily()}}> Day </Button>
              <Button  variant="secondary" onClick={() => {this.makeweekly()}}> Week </Button>


              </ButtonGroup>
              <div style={{ width: "30%", position:"absolute", right:"-15%", top:"60%"}}>
{ //              <MuiPickersUtilsProvider utils={DateFnsUtils} >
//               <KeyboardDatePicker
//                 style={{ width: "41%", align:"right"}}
//                 disableToolbar
//                 variant="inline"
//                 format="MM/dd/yyyy"
//                 id="date-picker-inline"
//                 label="start Date"
//                 autoOk={true}
//                 value={startdate}
//                 onChange={(e) => {this.setState({ startdate: format(e, "yyyy-MM-dd") });
//                 }}
//                 KeyboardButtonProps={{
//                   'aria-label': 'change date',
//                 }}
//               />
//             </MuiPickersUtilsProvider>}
}
            </div>
            </div>
      <Button backgroundcolor="red" onClick={() => {this.props.action(); this.destroyChart()}}>
      Close
    </Button>
    </Modal>
    )
  }
}