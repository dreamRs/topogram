HTMLWidgets.widget({

  name: 'topogRam',

  type: 'output',

  initialize: function(el, width, height) {

        //var width = 500,
	      //    height = 500;

        return {
            //projection: d3.geo.albers().origin([8, 45.5]).scale(2500)
            width: width, height: height
        };

    },

    renderValue: function(el, x, instance) {

        var df = x.data;
        var fields = x.fields;
        var field = x.fields[0];
	      var colors = x.colors;

	      console.log(instance.width);

	      // Projection
	      var projection = d3.geo.albers().origin(x.origin).scale(x.scale);
	      //var projection = d3.geo.albers().center(x.origin).scale(x.scale);
	      //var projection = d3.geo.albers().origin(x.origin).scale(2500);
	      if (x.shape == 'usa-states') {
	        var projection = d3.geo.albersUsa();
	      }



	      if (x.addSelect) {
	        d3.select(el).select("select").remove();
	        d3.select(el).append("select")
          	.attr("id", x.idSelect) //"selectField"
          	.attr("title", "Select a variable")
          	.attr("class", "selectpicker input-large form-control")
          	.selectAll("option")
                  .data(fields)
                  .enter()
                  .append("option")
                    .attr("value", function(d) { return d.key; })
                    .text(function(d) {
                      if (!d.name) {
                         return d.key;
                      } else {
                         return d.name;
                      }
                    });
           var fieldSelect = d3.select("#"+x.idSelect)
            .on("change", function(e) {
              field = fields[this.selectedIndex];
    		      update();
            });
	      }


	      //var width = el.getBoundingClientRect().width;
        //var height = el.getBoundingClientRect().height - 70;
        //var height = width * 0.625 - 70;
        //var radius = Math.min(width, height) / 2;


        //console.log(width);

        d3.select(el).select("svg").remove();
	      d3.select(el).append("svg")
            .attr("width", instance.width) //
            .attr("height", instance.height);




        function init() {

        	var features = carto.features(topology, geometries),
        		path = d3.geo.path()
        			.projection(proj);

        	states = states.data(features)
        		.enter()
        		.append("path")
        		.attr("class", "state")
        		.attr("id", function(d) {
        		  if (typeof d.properties !== 'undefined') {
        		    if (x.shape == 'france-reg' || x.shape == 'france-dep' || x.shape == 'france-dep-2' || x.shape == 'france-reg-2016') {
          		    //console.log(d);
          		    return d.properties.id;
          		  } else {
          		    return d.properties.NAME;
          		  }
        		  } else {
        		    return Math.random()
        		  }
        		})
        		.attr("fill", "#fafafa")
        		.attr("d", path);

        	//states.append("title");

        	update();
        }


        function update() {

        	//body.classed("updating", true);


        	var key = field.key,
        	fmt = (typeof field.format === "function")
        	  ? field.format
        	  : d3.format(field.format || ","),
        	value = function(d) {
        	      if (typeof d.properties !== 'undefined') {
          		    return +d.properties[key];
          		  } else {
          		    return 0
          		  }
        	},
        	values = states.data()
        	  .map(value)
        	  .filter(function(n) {
        		  return !isNaN(n);
        	  })
        	  .sort(d3.ascending),
        	lo = values[0],
        	hi = values[values.length - 1];

        	//var color = d3.scale.quantize().range(colors).domain([lo,hi]);
        	var color = d3.scale.linear()
          .range(colors)
          .domain(lo < 0
            ? [lo, 0, hi]
            : [lo, d3.mean(values), hi]);

        	// normalize the scale to positive numbers
        	var scale = d3.scale.linear()
        		.domain([lo, hi])
        		.range([1, 1000]);

        	// tell the cartogram to use the scaled values
        	carto.value(function(d) {
        		return scale(value(d));
        	});

        	// generate the new features, pre-projected
        	var features = carto(topology, geometries).features;
        	// update the data
        	//states.data(features)
        	//	.select("title")
        	//	.text(function(d) {
        	//		var t = [d.properties.NAME, fmt(value(d))].join(" : ");
        	//		return [t, field.lab].join(" ");
        	//	});

          // Tooltip
        	states.data(features).on("mouseover", function(d) {
              div.transition()
                  .duration(200)
                  .style("opacity", .9);
              div	.html("<b>" + d.properties.NAME + " :</b> "  + fmt(value(d)) + " " + field.lab)
                  .style("left", (d3.event.pageX) + "px")
                  .style("top", (d3.event.pageY - 28) + "px");
            })
            .on("mouseout", function(d) {
                div.transition()
                    .duration(500)
                    .style("opacity", 0);
            });



        	states.transition()
        		.duration(750)
        		.ease("linear")
        		//.attr("fill", "#fafafa")
        		.attr("fill", function(d) {
        			return color(value(d));
        		})
        		.attr("d", carto.path);

        	// states.text(function(d) {
        		// return [d, field.lab].join(" ");
        	// });

        	//body.classed("updating", false);
        }


        var proj = projection,
          	topology,
          	geometries,
          	rawData,
          	dataById = {},
          	carto = d3.cartogram()
          		.projection(proj)
          		.properties(function(d) {
          			return dataById[d.id];
          		})
          		.value(function(d) {
          		  if (typeof d.properties !== 'undefined') {
          		    return +d.properties[key];
          		  } else {
          		    return NaN
          		  }
          		})
          	.iterations(20);

        var svg = d3.select(el).select("svg");
        svg.selectAll("*").remove();



        var map = d3.select(el).select("svg"),
          	zoom = d3.behavior.zoom()
          			.translate([-38, 32])
          			.scale(.94)
          			.scaleExtent([0.5, 10.0])
          			.on("zoom", updateZoom),
          	layer = map.append("g")
          			.attr("id", "layer"),
          	states = layer.append("g")
          			.attr("id", "states")
          			.selectAll("path");

        updateZoom();

        function updateZoom() {
        	var scale = zoom.scale();
        	layer.attr("transform",
        				"translate(" + zoom.translate() + ") " +
        				"scale(" + [scale, scale] + ")");
        }

        var div = d3.select(el).append("div")
          .attr("class", "tooltip")
          .style("opacity", 0);

        //var shape = HTMLWidgets.getAttachmentUrl('shapes', x.shape);
        //console.log(shape);

        if (x.shape == 'usa-states') {
	        var shapejs = usaStates;
	      } else if (x.shape == 'france-reg') {
	        var shapejs = frReg;
	      } else if (x.shape == 'france-dep') {
	        var shapejs = frDep;
	      } else if (x.shape == 'france-reg-2016') {
	        var shapejs = frReg2016;
	      }

        //d3.json(shape, function(topo) {
          	topology = shapejs;
          	geometries = topology.objects.states.geometries;
          	data = df;
          	rawData = data;
          	dataById = d3.nest()
          		.key(function(d) {
          		  if (x.shape == 'france-reg' || x.shape == 'france-dep' || x.shape == 'france-dep-2' || x.shape == 'france-reg-2016') {
          		    return d.id;
          		  } else {
          		    return d.NAME;
        		    }
          		})
          		.rollup(function(d) { return d[0]; })
          		.map(data);
          	init();
        //});


    },
    resize: function(el, width, height, instance) {

    }
});
