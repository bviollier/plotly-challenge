function read_in(idname) {
    d3.json("samples.json").then((data) => {
        var id_read = data.metadata;
        var filter = id_read.filter(row => row.id == idname);
        filter=filter[0];
        var metadata = d3.select("#sample-metadata");
        metadata.html("");
        Object.defineProperties(filter).forEach(([key, value]) => {
            metadata.append("p").text(`${key}:${value}`);
        });
    });
}

function dropdown_menu() {
    var id_dropdown = d3.select("#selDataset");
    d3.json("../..//samples.json").then((data) => {
        var id_names = data.names;
        id_names.forEach((id) => {
            id_dropdown.append("option").text(id).property("value", id);
        });
    });
}

function optionChanged(new_id) {
    read_data(new_id);
    barPlot(new_id);
    bubbleplot(new_id);
}

function bar_graph(idname) {
    d3.json("../../samples.json").then((data) => {
        var id_bar = data.samples;
        var filter = id.filter(row => row.id == idname);
        filter=filter[0];
        var otu_ids = filter.o_ids;
        var otu_labels = filter.o_labels;
        var samplevalue = filter.sample_values;
        var y_axis = otu_ids.slice(0,10).map(otu_ids)

        var trace_bar = [{
            x: samplevalue.slice(0,10).reverse(),
            y: y_axis,
            type: "bar",
            text: otu_labels.slice(0,10),
            orientation: 'h'
        }];

        var layout = {
            title: "Top Ten IDs"
        }

        Plotly.newplot("bar", trace_bar, layout)
    });
}

function bubble_graph(idname) {
    d3.json("../../samples.json").then((data) => {
        var id_bubble = data.samples;
        var filter = id.filter(row => row.id == idname);
        filter=filter[0];
        var otu_ids = filter.o_ids;
        var otu_labels = filter.o_labels;
        var samplevalue = filter.sample_values;

        var trace_bubble = [{
            x: otu_ids,
            y: samplevalue,
            text: otu_labels,
            mode: 'markers',
            marker: {
                color: otu_ids,
                opacity: [1, 0, 7, 0, 6, 0, 5],
                size: samplevalue
            }
        }];
        
        var layout = {
            title: "Bubble Chart",
            height: 750,
            width: 1500
        };

        Plotly.newPlot("bubble", trace_bubble, layout);
    });
}


// function buildCharts(sample) {
//     d3.json("../samples.json").then((data) => {
//         const otu_ids = data.otu_ids;
//         const otu_labels = data.otu_labels;
//         const sample_values = data.sample_values;
        
//         let bubbleLayout = {
//             margin: {t:0},
//             hovermode: "closests",
//             xaxis: {title: "OTU ID"}
//         }

//         let bubbleData = [{
//             x: otu_ids,
//             y: sample_values,
//             text: otu_labels,
//             mode: "markers",
//             marker: {
//                 size: sample_values,
//                 color: otu_ids,
//                 colorscale: "earth"
//             }
//         }]

//         Plotly.plot("bubble", bubbleData, bubbleLayout);

//         let barData = [{
//             x: sample_value.slice(0,10).reverse(),
//             y: y_axis,
//             type: "bar",
//             text: otu_labels.slice(0,10),
//             orientation: 'h'
            
//         }]
//     })
// }