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

    var generaLanguages = [
        { "id":1, "Name": "JavaScript", "Count": 38845, "Type": "Script", "Procent":"67.7%" },
        { "id":2, "Name": "HTML/CSS", "Count": 36206, "Type": "Declarative", "Procent":"63.1%" },
        { "id":3, "Name": "SQL", "Count": 31386, "Type": "Declarative", "Procent":"54.7%" },
        { "id":4, "Name": "Python", "Count": 25304, "Type": "Script", "Procent":"44.1%" },
        { "id":5, "Name": "Java", "Count": 23066, "Type": "Object_oriented", "Procent":"40.2%" },
        { "id":6, "Name": "Powershell", "Count": 18992, "Type": "Script", "Procent":"33.1%" },
        { "id":7, "Name": "C#", "Count": 18017, "Type": "Object_oriented", "Procent":"31.4%" },
        { "id":8, "Name": "PHP", "Count": 15033, "Type": "Script", "Procent":"26.2%" },
        { "id":9, "Name": "TypeScript", "Count": 14574, "Type": "Script", "Procent":"25.4%" },
        { "id":10, "Name": "C++", "Count": 13713, "Type": "Object_oriented", "Procent":"23.9%" },
        { "id":11, "Name": "C", "Count": 12508, "Type": "Procedural", "Procent":"21.8%" },
        { "id":12, "Name": "Go", "Count": 5049, "Type": "Procedural", "Procent":"8.8%" },
        { "id":13, "Name": "Kotlin", "Count": 4475, "Type": "Object_oriented", "Procent":"7.8%" },
        { "id":14, "Name": "Ruby", "Count": 4074, "Type": "Object_oriented", "Procent":"7.1%" },
        { "id":15, "Name": "Assembly", "Count": 3557, "Type": "Proceduralass", "Procent":"6.2%" },
        { "id":16, "Name": "VBA", "Count": 3500, "Type": "Object_oriented", "Procent":"6.1%" },
        { "id":17, "Name": "Swift", "Count": 3385, "Type": "Object_oriented", "Procent":"5.9%" },
        { "id":18, "Name": "R", "Count": 3271, "Type": "Functional", "Procent":"5.7%" },
        { "id":19, "Name": "Rust", "Count": 2926, "Type": "Object_oriented", "Procent":"5.1%" },
        { "id":20, "Name": "Objective-C", "Count": 2352, "Type": "Object_oriented", "Procent":"4.1%" },
        { "id":21, "Name": "Dart", "Count": 2295, "Type": "Object_oriented", "Procent":"4%" },
        { "id":22, "Name": "Scala", "Count": 2066, "Type": "Functional", "Procent":"3.6%" },
        { "id":23, "Name": "Perl", "Count": 1779, "Type": "Object_oriented", "Procent":"3.1%" },
        { "id":24, "Name": "Haskell", "Count": 1205, "Type": "Functional", "Procent":"2.1%" },
        { "id":25, "Name": "Julia", "Count": 516 ,"Type": "Procedural", "Procent":"0.9%"}   
    ];

    var lovedLanguages = [
        { "id":1, "Name": "JavaScript", "Count":33451, "Type": "Script", "Procent":"58.3%" },
        { "id":2, "Name": "HTML/CSS", "Count":30697, "Type": "Declarative", "Procent":"53.5%" },
        { "id":3, "Name": "SQL", "Count":32476, "Type": "Declarative", "Procent":"56.6%" },
        { "id":4, "Name": "Python", "Count":38271, "Type": "Script", "Procent":"66.7%" },
        { "id":5, "Name": "Java", "Count":25304, "Type": "Object_oriented", "Procent":"44.1%" },
        { "id":6, "Name": "Powershell", "Count":30812, "Type": "Script", "Procent":"53.7%" },
        { "id":7, "Name": "C#", "Count":34255, "Type": "Object_oriented", "Procent":"59.7%" },
        { "id":8, "Name": "PHP", "Count":21402, "Type": "Script", "Procent":"37.3%" },
        { "id":9, "Name": "TypeScript", "Count":38501, "Type": "Script", "Procent":"67.1%" },
        { "id":10, "Name": "C++", "Count":24902, "Type": "Object_oriented", "Procent":"43.4%" },
        { "id":11, "Name": "C", "Count":18992, "Type": "Procedural", "Procent":"33.1%" },
        { "id":12, "Name": "Go", "Count":35746, "Type": "Procedural", "Procent":"62.3%" },
        { "id":13, "Name": "Kotlin", "Count":36091, "Type": "Object_oriented", "Procent":"62.9%" },
        { "id":14, "Name": "Ruby", "Count":24615, "Type": "Object_oriented", "Procent":"42.9%" },
        { "id":15, "Name": "Assembly", "Count":16869, "Type": "Proceduralass", "Procent":"29.4%" },
        { "id":16, "Name": "VBA", "Count":11246, "Type": "Object_oriented", "Procent":"19.6%" },
        { "id":17, "Name": "Swift", "Count":34140, "Type": "Object_oriented", "Procent":"59.5%" },
        { "id":18, "Name": "R", "Count":25533, "Type": "Functional", "Procent":"44.5%" },
        { "id":19, "Name": "Rust", "Count":49402 , "Type": "Object_oriented", "Procent":"86.1%" },
        { "id":20, "Name": "Objective-C", "Count":13426, "Type": "Object_oriented", "Procent":"23.4%" },
        { "id":21, "Name": "Dart", "Count":35632, "Type": "Object_oriented", "Procent":"62.1%" },
        { "id":22, "Name": "Scala", "Count":30525, "Type": "Functional", "Procent":"53.2%" },
        { "id":23, "Name": "Perl", "Count":16410, "Type": "Object_oriented", "Procent":"28.6%" },
        { "id":24, "Name": "Haskell", "Count":29664, "Type": "Functional", "Procent":"51.7%" },
        { "id":25, "Name": "Julia", "Count":35689 ,"Type": "Procedural", "Procent":"62.2%"}   
    ];

    dataset = generaLanguages

    // color palette
    var color = d3.scaleOrdinal()
        .domain(["Procedural", "Script", "Object_oriented", "Functional", "Declarative"])
        .range(d3.schemeSet3);

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
            .html('<u>' + d.Name + "<br>"  + d.Procent + '</u>' + "<br>" + d.Count + " votes")
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