// @TODO: YOUR CODE HERE!

// SVG wrapper dimensions are determined by the current width
// and height of the browser window.
var svgWidth = 1200;
var svgHeight = 780;

var margin = {
  top: 50,
  right: 50,
  bottom: 100,
  left: 70
};

var height = svgHeight - margin.top - margin.bottom;
var width = svgWidth - margin.left - margin.right;

// Create an SVG wrapper, append an SVG group that will hold our chart,
// and shift the latter by left and top margins.
var svg = d3
  .select("#scatter")
  .append("svg")
  .attr("width", svgWidth)
  .attr("height", svgHeight);

// Append an SVG group
var chartGroup = svg.append("g")
  .attr("transform", `translate(${margin.left}, ${margin.top})`);

// Load data from data.csv
d3.csv("./assets/data/data.csv").then(function(csvData) {
  
    console.log(csvData);  
    
    // Change povery and healthcare values to numbers
    csvData.forEach(function(data) {
        data.poverty = +data.poverty;
        data.healthcare = +data.healthcare;
        console.log("State Abbr:", data.abbr);
        console.log("Poverty:", data.poverty);
        console.log("Healthcare:", data.healthcare);
    });

// scales
var xScale = d3.scaleLinear()
  .domain([8, d3.max(csvData, d => d.poverty)])
  .range([0, width]);

var yScale = d3.scaleLinear()
  .domain([4, d3.max(csvData, d => d.healthcare)])
  .range([height, 0]);


// Create initial axis functions
var bottomAxis = d3.axisBottom(xScale);
var leftAxis = d3.axisLeft(yScale);

// append x axis
var xAxis = chartGroup.append("g")
  .classed("x-axis", true)
  .attr("transform", `translate(0, ${height})`)
  .call(bottomAxis);

// append y axis
chartGroup.append("g")
  .call(leftAxis);

// Create axes labels
chartGroup.append("text")
    .attr("transform", `translate(${width / 2}, ${height + margin.top + 15})`)
    .attr("class", "aText")
    .text("In Poverty (%)");

chartGroup.append("text")
  .attr("transform", "rotate(-90)")
  .attr("y", 20 - margin.left)
  .attr("x", 0 - (height / 2))
  .attr("class", "aText")
  .text("Lacks Healthcare (%)");

// Create Circles
var circlesGroup = chartGroup.selectAll("circle")
.data(csvData)
.enter()
.append("circle")
.attr("cx", d => xScale(d.poverty))
.attr("cy", d => yScale(d.healthcare))
.attr("r", "15")
.attr("class", "stateCircle");

// Create Text in Circles
var circlesText = chartGroup.selectAll("circle.text")
.data(csvData)
.enter()
.append("text")
.attr("dx", d => xScale(d.poverty))
.attr("dy", d => yScale(d.healthcare) + 5)
.text(function(d){return d.abbr})
.attr("class", "stateText");
});

