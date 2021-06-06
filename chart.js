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

    d3.csv("https://raw.githubusercontent.com/holtzy/data_to_viz/master/Example_dataset/11_SevCatOneNumNestedOneObsPerGroup.csv", function (data) {

        // Filter a bit the data -> more than 1 million inhabitants
        data = data.filter((d) => { return d.value > 10000000 })
        console.log(data);

        // color palette
        var color = d3.scaleOrdinal()
            .domain(["Asia", "Europe", "Africa", "Oceania", "Americas"])
            .range(d3.schemeSet1);

        var size = d3.scaleLinear()
            .domain([0, 1400000000])
            .range([20, 80])  // circle radius

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
                .html('<u>' + d.key + '</u>' + "<br>" + d.value + " inhabitants")
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
            .data(data)
            .enter()
            .append("circle")
            .attr("class", "node")
            .attr("r", (d) => { return size(d.value) })
            .attr("cx", width / 2)
            .attr("cy", height / 2)
            .style("fill", (d) => { return color(d.region) })
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
            .force("collide", d3.forceCollide().strength(.2).radius((d) => { return (size(d.value) + 3) }).iterations(1)) // force that avoids circle overlapping

        // animation
        simulation
            .nodes(data)
            .on("tick", (d) => {
                node
                    .attr("cx", (d) => { return d.x; })
                    .attr("cy", (d) => { return d.y; })
            });
    })
}