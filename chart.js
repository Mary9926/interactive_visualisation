document.addEventListener("DOMContentLoaded", () => {
    drawBubbleChart();
});

let drawBubbleChart = () => {
    var width = 800
    var height = 800

    var svg = d3.select("#languages_chart")
        .append("svg")
        .attr("width", width)
        .attr("height", height)

    var generalanguages = [
        { "id":1, "Name": "JavaScript", "Count": 38845, "Type": "Functional" },
        { "id":2, "Name": "HTML/CSS", "Count": 36206, "Type": "Functional" },
        { "id":3, "Name": "SQL", "Count": 31386, "Type": "Object_oriented" },
        { "id":4, "Name": "Python", "Count": 25304, "Type": "Functional" },
        { "id":5, "Name": "Java", "Count": 23066, "Type": "Functional" },
        { "id":6, "Name": "Powershell", "Count": 18992, "Type": "Object_oriented" },
        { "id":7, "Name": "c#", "Count": 18017, "Type": "Functional" },
        { "id":8, "Name": "PHP", "Count": 15033, "Type": "Functional" },
        { "id":9, "Name": "TypeScript", "Count": 14574, "Type": "Functional" },
        { "id":10, "Name": "C++", "Count": 13713, "Type": "Procedural" },
        { "id":11, "Name": "C", "Count": 12508, "Type": "Functional" },
        { "id":12, "Name": "Go", "Count": 5049, "Type": "Procedural" },
        { "id":13, "Name": "Kotlin", "Count": 4475, "Type": "Functional" },
        { "id":14, "Name": "Ruby", "Count": 4074, "Type": "Functional" },
        { "id":15, "Name": "Assembly", "Count": 3557, "Type": "Functional" },
        { "id":16, "Name": "VBA", "Count": 3500, "Type": "Functional" },
        { "id":17, "Name": "Swift", "Count": 3385, "Type": "Functional" },
        { "id":18, "Name": "R", "Count": 3271, "Type": "Object_oriented" },
        { "id":19, "Name": "Rust", "Count": 2926, "Type": "Functional" },
        { "id":20, "Name": "Objective-C", "Count": 2352, "Type": "Functional" },
        { "id":21, "Name": "Dart", "Count": 2295, "Type": "Procedural" },
        { "id":22, "Name": "Scala", "Count": 2066, "Type": "Functional" },
        { "id":23, "Name": "Perl", "Count": 1779, "Type": "Procedural" },
        { "id":24, "Name": "Haskell", "Count": 1205, "Type": "Functional" },
        { "id":25, "Name": "Julia", "Count": 516 ,"Type": "Functional"  }
    ];
    dataset = generalanguages

    // color palette
    var color = d3.scaleOrdinal()
        .domain(["Object_oriented", "Functional", "Procedural"])
        .range(d3.schemeSet2);

    var size = d3.scaleLinear()
        .domain([0, 60000])
        .range([20, 100])  // circle radius

    // create a tooltip
    var Tooltip = d3.select("#languages_chart")
        .append("div")
        .style("opacity", 0)
        .attr("class", "tooltip")
        .style("background-color", "white")
        .style("border", "solid")
        .style("border-width", "3px")
        .style("border-radius", "6px")
        .style("padding", "10px")

    // tooltip functions
    var mouseover = (d) => {
        Tooltip
            .style("opacity", 1)
    }
    var mousemove = (d) => {
        Tooltip
            .html('<u>' + d.Name + '</u>' + "<br>" + d.Count + " votes")
            .style("left", (d3.mouse(this)[0] + 20) + "px")
            .style("top", (d3.mouse(this)[1]) + "px")
    }
    var mouseleave = (d) => {
        Tooltip
            .style("opacity", 0)
    }

    // node creation
    var node = svg.append("g")
        .selectAll("circle")
        .data(dataset)
        .enter()
        .append("circle")
        .attr("class", "node")
        .attr("r", (d) => { return size(d.Count) })
        .attr("cx", width / 2)
        .attr("cy", height / 2)
        .style("fill", (d) => { return color(d.Type) })
        .style("fill-opacity", 0.8)
        .attr("stroke", "black")
        .style("stroke-width", 1)
        .on("mouseover", mouseover)
        .on("mousemove", mousemove)
        .on("mouseleave", mouseleave)

    // forces applied to the nodes
    var simulation = d3.forceSimulation()
        .force("center", d3.forceCenter().x(width / 2).y(height / 2)) // center
        .force("charge", d3.forceManyBody().strength(.1)) // nodes space
        .force("collide", d3.forceCollide().strength(.2).radius((d) => { return (size(d.Count) + 3) }).iterations(1)) // force that avoids circle overlapping

    // animation
    simulation
        .nodes(dataset)
        .on("tick", (d) => {
            node
                .attr("cx", (d) => { return d.x; })
                .attr("cy", (d) => { return d.y; })
        });

}