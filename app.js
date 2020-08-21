
function create_plot(id) {
    
    d3.json("samples.json").then((data)=> {
        console.log(data)
        
        var samples = data.samples.filter(s => s.id.toString() === id)[0];
        
        console.log(samples);
  
        var samplevalues = samples.sample_values.slice(0, 10).reverse();
  
        var otu_top_10 = (samples.otu_ids.slice(0, 10)).reverse();
        
        var otu_id = otu_top_10.map(d => "OTU " + d)
  
        var labels = samples.otu_labels.slice(0, 10);
  
        var trace = {
            x: samplevalues,
            y: otu_id,
            text: labels,
            marker: {
              color: 'light blue'},
            type:"bar",
            orientation: "h",
        };
  
        var data = [trace];
  
        var layout = {
            title: "Top 10 OTU",
            margin: {
                l: 100,
                r: 100,
                t: 100,
                b: 30
            }
        };
  
        Plotly.newPlot("bar", data, layout);
  
        var trace1 = {
            x: samples.otu_ids,
            y: samples.sample_values,
            mode: "markers",
            marker: {
                size: samples.sample_values,
                color: samples.otu_ids
            },
            text: samples.otu_labels
  
        };
  
        var layout_b = {
            xaxis:{title: "OTU ID"},
            height: 775,
            width: 1150
        };
  
        var data1 = [trace1];

        Plotly.newPlot("bubble", data1, layout_b); 

      });
  }  


function read_data(id) {
    
    d3.json("samples.json").then((data)=> {
        
        var metadata = data.metadata;

        console.log(metadata)

        var result = metadata.filter(meta => meta.id.toString() === id)[0];

        var demo_info = d3.select("#sample-metadata");
        
        demo_info.html("");

        Object.entries(result).forEach((key) => {   
                demo_info.append("h5").text(key[0].toUpperCase() + ": " + key[1] + "\n");    
        });
    });
}

function optionChanged(id) {
    create_plot(id);
    read_data(id);
}

function init() {

    var dropdown = d3.select("#selDataset");

    d3.json("samples.json").then((data)=> {
        console.log(data)

        data.names.forEach(function(name) {
            dropdown.append("option").text(name).property("value");
        });

        create_plot(data.names[0]);
        read_data(data.names[0]);
    });
}

init();