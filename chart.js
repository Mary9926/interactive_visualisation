document.addEventListener("DOMContentLoaded", () => {
    drawBubbleChart(generalLanguages);

    let category = document.getElementById("category");
    let paradigm = document.getElementById("paradigm_select");

    category.addEventListener("change", (event) => {
        let selected_paradigm = paradigm.value;
        let selected_category = event.target.value;
        let dataset = extractDatasetBy(selected_category, selected_paradigm);
        drawBubbleChart(dataset);
    })

    paradigm.addEventListener("change", (event) => {
        let selected_paradigm = event.target.value;
        let selected_category = category.value;
        let dataset = extractDatasetBy(selected_category, selected_paradigm);
        drawBubbleChart(dataset);
    })
});

let extractDatasetBy = (selected_category, selected_paradigm) => {
    let dataset = getDatasetByCategory(selected_category);
    if (selected_paradigm != "All") {
        dataset = dataset.filter(lang => selected_paradigm == lang.Type);
    }
    return dataset;
}

let getDatasetByCategory = (selected_category) => {
    switch (selected_category) {
        case 'popular': return generalLanguages;
        case 'wanted': return wantedLanguages;
        case "loved": return lovedLanguages;
        case "dreaded": return dreadedLanguages;
    }
}

let drawBubbleChart = (dataset) => {
    var width = 800
    var height = 800

    document.getElementById("languages_chart").innerHTML = "";

    var svg = d3.select("#languages_chart")
        .append("svg")
        .attr("width", width)
        .attr("height", height)

    // color palette
    var color = d3.scaleOrdinal()
        .domain(["Procedural", "Script", "Object_oriented", "Functional", "Declarative"])
        .range(d3.schemeSet3);

    var size = d3.scaleLinear()
        .domain([0, 60000])
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
    var mousemove = function (d) {
        Tooltip
            .html('<u>' + d.Name + "<br>" + d.Procent + '</u>' + "<br>" + d.Count + " votes")
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
        })
        .on("end", (d) => {
            node
                .attr("cx", (d) => { return d.x; })
                .attr("cy", (d) => { return d.y; })
        });


}