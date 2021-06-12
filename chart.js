let selectedItems = [];
var langueageIdFirst = 0;
var langueageIdSecond = 0;

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
    selectedItems = [];
    var width = 800;
    var height = 800;

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
        .range([20, 80]);  // circle radius

    // create a tooltip
    var Tooltip = d3.select("#languages_chart")
        .append("div")
        .style("opacity", 0)
        .attr("class", "tooltip")
        .style("background-color", "white")
        .style("border", "solid")
        .style("border-width", "3px")
        .style("border-radius", "6px")
        .style("padding", "10px");

    // tooltip functions
    var mouseover = (d) => {
        Tooltip
            .style("opacity", 1);
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
    var onClick = function (d, i) {
        if (!d3.select(this).classed("selected") && selectedItems.length < 2) {
            selectedItems.push(d.id);
            d3.select(this).classed("selected", true);
            d3.select(this).transition().attr("stroke", "black").style("stroke-width", 6);
        }
        else if (d3.select(this).classed("selected")) {
            selectedItems.splice(selectedItems.indexOf(d.id), 1);
            d3.select(this).classed("selected", false);
            d3.select(this).transition().attr("stroke", "black").style("stroke-width", 1);
        }

        console.log(selectedItems);
        var langueageIdFirst = selectedItems[0];
        var langueageIdSecond = selectedItems[1];

        console.log(langueageIdFirst);
        console.log(langueageIdSecond);
    }

    var compare = function (d) {
        console.log("compare");
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
        .attr("cursor", "pointer")
        .style("stroke-width", 1)
        .on('click', onClick)
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

//--------------------------.......................................

let draw = (langueageIdFirst, langueageIdSecond) => {

    // set the dimensions and margins of the graph
    var margin = { top: 10, right: 30, bottom: 20, left: 50 },
        width = 460 - margin.left - margin.right,
        height = 400 - margin.top - margin.bottom;

    // append the svg object to the body of the page
    var svg = d3.select("#comparison")
        .append("svg")
        .attr("width", width + margin.left + margin.right)
        .attr("height", height + margin.top + margin.bottom)
        .append("g")
        .attr("transform","translate(" + margin.left + "," + margin.top + ")");

        data = [
            {
                group: "Most loved",
                "c#": 12,
                "java": 4
            },
            {
                group: "Most dreaded",
                "java": 14,
                "c#": 6
            }
        ]

        // List of subgroups = header of the csv files = soil condition here
        //var subgroups = data.columns.slice(1)
        console.log(subgroups)
        var subgroups = ["c#", "java"]

        // List of groups = species here = value of the first column called group -> I show them on the X axis
        var groups = d3.map(data, function (d) { return (d.group) }).keys()
        console.log(groups)
        groups = ["Most loved", "Most dreaded"]

        // Add X axis
        var x = d3.scaleBand()
            .domain(groups)
            .range([0, width])
            .padding([0.2])
        svg.append("g")
            .attr("transform", "translate(0," + height + ")")
            .call(d3.axisBottom(x).tickSize(0));

        // Add Y axis
        var y = d3.scaleLinear()
            .domain([0, 40])
            .range([height, 0]);
        svg.append("g")
            .call(d3.axisLeft(y));

        // Another scale for subgroup position?
        var xSubgroup = d3.scaleBand()
            .domain(subgroups)
            .range([0, x.bandwidth()])
            .padding([0.05])

        // color palette = one color per subgroup
        var color = d3.scaleOrdinal()
            .domain(subgroups)
            .range(d3.schemeSet2)

        // Show the bars
        svg.append("g")
            .selectAll("g")
            // Enter in data = loop group per group
            .data(data)
            .enter()
            .append("g")
            .attr("transform", function (d) { return "translate(" + x(d.group) + ",0)"; })
            .selectAll("rect")
            .data(function (d) { return subgroups.map(function (key) { return { key: key, value: d[key] }; }); })
            .enter().append("rect")
            .attr("x", function (d) { return xSubgroup(d.key); })
            .attr("y", function (d) { return y(d.value); })
            .attr("width", xSubgroup.bandwidth())
            .attr("height", function (d) { return height - y(d.value); })
            .attr("fill", function (d) { return color(d.key); });

    
}