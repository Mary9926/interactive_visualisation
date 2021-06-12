let selectedItems = [];

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

    document.getElementById("compareBtn").addEventListener("click", (event) => {
        if (selectedItems.length == 2) {
            drawCompare(selectedItems[0], selectedItems[1]);
        }
        else{
            alert("Please select two languages");
        }
    });
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
        .style("padding", "10px")
        .style("position", "absolute");

    // tooltip functions
    var mouseover = (d) => {
        Tooltip
            .style("opacity", 1);
    }
    var mousemove = function (d) {
        Tooltip
            .html('<u>' + d.Name + "<br>" + d.Procent + "%" + '</u>' + "<br>" + d.Count + " votes")
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

let getLanguageById = (dataset, id) => {
    return dataset.filter(lang => lang.id == id)[0];
}

let drawCompare = (langueageIdFirst, langueageIdSecond) => {
    d3.select("#comparison > *").remove();

    // set the dimensions and margins of the graph
    var margin = { top: 50, right: 30, bottom: 20, left: 50 },
        width = 500 - margin.left - margin.right,
        height = 400 - margin.top - margin.bottom;

    // append the svg object to the body of the page

    var svg = d3.select("#comparison")
        .append("svg")
        .attr("width", width + margin.left + margin.right)
        .attr("height", height + margin.top + margin.bottom)
        .append("g")
        .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

    data = [
        {
            group: "Popular",
            "firstLanguage": getLanguageById(generalLanguages, langueageIdFirst).Procent,
            "secondLanguage": getLanguageById(generalLanguages, langueageIdSecond).Procent
        },
        {
            group: "Loved",
            "firstLanguage": getLanguageById(lovedLanguages, langueageIdFirst).Procent,
            "secondLanguage": getLanguageById(lovedLanguages, langueageIdSecond).Procent
        },
        {
            group: "Dreaded",
            "firstLanguage": getLanguageById(dreadedLanguages, langueageIdFirst).Procent,
            "secondLanguage": getLanguageById(dreadedLanguages, langueageIdSecond).Procent
        },
        {
            group: "Wanted",
            "firstLanguage": getLanguageById(wantedLanguages, langueageIdFirst).Procent,
            "secondLanguage": getLanguageById(wantedLanguages, langueageIdSecond).Procent
        }
    ]

    var subgroups = ["firstLanguage", "secondLanguage"]
    var groups = ["Popular", "Loved", "Dreaded", "Wanted"]

    //title
    svg.append("text")
        .attr("x", (width / 2))
        .attr("y", 0 - (margin.top / 2))
        .attr("text-anchor", "middle")
        .attr("class", "titleStyle")
        .style("font-size", "18px times")
        .style("text-decoration", "bold")
        .style("fill", "white")
        .text("Comparison in %");

    //legend
    svg.append("circle").attr("cx", 300).attr("cy", 30).attr("r", 10).style("fill", "#66c2a5")
    svg.append("circle").attr("cx", 300).attr("cy", 60).attr("r", 10).style("fill", "#fc8d62")
    svg.append("text").attr("x", 320).attr("y", 30)
        .text("" + getLanguageById(generalLanguages, langueageIdFirst).Name + "")
        .style("font-size", "15px times")
        .attr("alignment-baseline", "right")
        .style("fill", "white")
    svg.append("text").attr("x", 320).attr("y", 60)
        .text("" + getLanguageById(generalLanguages, langueageIdSecond).Name + "")
        .style("font-size", "15px times")
        .attr("alignment-baseline", "right")
        .style("fill", "white")


    // Add X axis
    var x = d3.scaleBand()
        .domain(groups)
        .range([0, width])
        .padding([0.1])
    svg.append("g")
        .attr("transform", "translate(0," + height + ")")
        .call(d3.axisBottom(x).tickSize(0))
        .attr("class", "xAxisStyle")
        .style("font", "16px times");

    // Add Y axis
    var y = d3.scaleLinear()
        .domain([0, 100])
        .range([height, 0]);
    svg.append("g")
        .call(d3.axisLeft(y))
        .attr("class", "yAxisStyle")
        .style("font", "16px times");
    // Another scale for subgroup position?
    var xSubgroup = d3.scaleBand()
        .domain(subgroups)
        .range([0, x.bandwidth()])
        .padding([0.15])

    // color palette
    var color = d3.scaleOrdinal()
        .domain(subgroups)
        .range(d3.schemeSet2)

    // Show the bars
    svg.append("g")
        .selectAll("g")
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
