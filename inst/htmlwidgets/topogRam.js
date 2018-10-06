HTMLWidgets.widget({

  name: 'topogram',

  type: 'output',

  factory: function(el, width, height) {

    var carto, statesbbox, projection, topoWidth, topoHeight, palette, format_value, tooltip_label, legendSequential, svg;

    var padding = 30;

    function removeElement(elementId) {
      var element = document.getElementById(elementId);
      element.parentNode.removeChild(element);
    }

    return {

      renderValue: function(x) {

        if (x.d3_locale) {
          d3.formatDefaultLocale(x.d3_locale);
        }

        // Color palette
        palette = x.palette;
        // Tooltip val formatter
        format_value = x.format_value;
        // Tooltip label
        tooltip_label = x.tooltip_label;

        if (!x.labs) {
          removeElement(el.id + '-title');
          removeElement(el.id + '-subtitle');
          removeElement(el.id + '-caption');
        } else {
          if (x.labsOpts.title !== null) {
            document.getElementById(el.id + '-title').innerHTML = x.labsOpts.title;
          } else {
            removeElement(el.id + '-title');
          }
          if (x.labsOpts.subtitle !== null) {
            document.getElementById(el.id + '-subtitle').innerHTML = x.labsOpts.subtitle;
          } else {
            removeElement(el.id + '-subtitle');
          }
          if (x.labsOpts.caption !== null) {
            document.getElementById(el.id + '-caption').innerHTML = x.labsOpts.caption;
          } else {
            removeElement(el.id + '-caption');
          }
        }

        topoWidth = width - padding;
        topoHeight = height - padding;

        projection = d3[x.projection]();
        statesbbox = topojson.feature(x.shape, x.shape.objects.states);
        projection.fitExtent([[padding, padding], [topoWidth, topoHeight]], statesbbox);

        var colorScale = d3.scaleSequential(d3[palette]).domain(x.range);

        carto = Cartogram()
          .width(width)
          .height(height)
          .topoJson(x.shape)
          .topoObjectName('states')
          .projection(projection)
          .iterations(x.n_iteration)
          .value(function(d) {
            //console.log(d);
            return d.properties[x.value];
          })
          .color(function(d) {
            return colorScale(d.properties[x.value]);
          })
          .label(function(d) {
            //console.log(d);
            //return "Population of" + d.properties.name + "(" + d.properties[x.value] + ")";
            return tooltip_label[d.id];
          })
          .valFormatter(format_value)
          .units(x.unit_value)
          //.onClick(function(d) {console.info(d)})
          (document.getElementById(el.id + '-topogram'));

          if (HTMLWidgets.shinyMode) {
            carto
              .onClick(function(d) {
                if (x.layerId === null) {
                  Shiny.onInputChange(el.id + '_click', d.properties);
                } else {
                  Shiny.onInputChange(el.id + '_click', x.layerId[d.id]);
                }
              });
          }


          if (x.legend) {
            svg = d3.select("div#" + el.id + "-topogram>svg");

            svg.append("g")
              .attr("class", "legendSequential")
              .attr("transform", "translate(20,40)");

            legendSequential = d3.legendColor()
                .title(x.legendOpts.title)
                .titleWidth(x.legendOpts.title_width)
                .locale(x.d3_locale) // d3.formatLocale(x.d3_locale)
                .labelFormat(x.legendOpts.label_format)
                .labels(x.legendOpts.labels)
                .shapeWidth(x.legendOpts.cells_width)
                .shapeHeight(x.legendOpts.cells_height)
                .shapePadding(x.legendOpts.cells_padding)
                .cells(x.legendOpts.n_cells)
                .orient(x.legendOpts.orientation)
                .scale(colorScale);

            svg.select(".legendSequential")
              .call(legendSequential);
          }

      },

      getChart: function() {
        return carto;
      },

      getLegend: function() {
        return legendSequential;
      },

      getSvg: function() {
        return svg;
      },

      getParams: function() {
        return {palette: palette, format_value: format_value, tooltip_label: tooltip_label};
      },

      resize: function(width, height) {
        topoWidth = width - padding;
        topoHeight = height - padding;
        projection.fitExtent([[padding, padding], [topoWidth, topoHeight]], statesbbox);
        carto.width(width).height(height).projection(projection);
      }

    };
  }
});

// From Friss tuto (https://github.com/FrissAnalytics/shinyJsTutorials/blob/master/tutorials/tutorial_03.Rmd)
function get_widget(id){

  // Get the HTMLWidgets object
  var htmlWidgetsObj = HTMLWidgets.find("#" + id);

  // Use the getChart method we created to get the underlying billboard chart
  var widgetObj ;

  if (typeof htmlWidgetsObj != 'undefined') {
    widgetObj = htmlWidgetsObj.getChart();
  }

  return(widgetObj);
}

function get_params(id){

  // Get the HTMLWidgets object
  var htmlWidgetsObj = HTMLWidgets.find("#" + id);

  // Use the getChart method we created to get the underlying billboard chart
  var params ;

  if (typeof htmlWidgetsObj != 'undefined') {
    params = htmlWidgetsObj.getParams();
  }

  return(params);
}

function get_legend(id){

  // Get the HTMLWidgets object
  var htmlWidgetsObj = HTMLWidgets.find("#" + id);

  // Use the getChart method we created to get the underlying billboard chart
  var lgd ;

  if (typeof htmlWidgetsObj != 'undefined') {
    lgd = htmlWidgetsObj.getLegend();
  }

  return(lgd);
}

function get_svg(id){

  // Get the HTMLWidgets object
  var htmlWidgetsObj = HTMLWidgets.find("#" + id);

  // Use the getChart method we created to get the underlying billboard chart
  var svg ;

  if (typeof htmlWidgetsObj != 'undefined') {
    svg = htmlWidgetsObj.getSvg();
  }

  return(svg);
}



if (HTMLWidgets.shinyMode) {
  Array.prototype.max = function() {
    return Math.max.apply(null, this);
  };

  Array.prototype.min = function() {
    return Math.min.apply(null, this);
  };

  // Update value used
  var values;
  Shiny.addCustomMessageHandler('update-topogram-value',
    function(params) {
      var carto = get_widget(params.id);
      if (typeof carto != 'undefined') {
        var paramsTopo = get_params(params.id);
        var lgdTopo = get_legend(params.id);
        var svg = get_svg(params.id);
        var pal = paramsTopo.palette;
        var fval = paramsTopo.format_value;
        var tlab = paramsTopo.tooltip_label;
        //
        values = [];
        carto
          .value(function(d) {
            values.push(d.properties[params.data.new_value]);
            return d.properties[params.data.new_value];
          })
          .valFormatter(fval)
          .label(function(d) {
            return tlab[d.id];
          });
        //console.log(values);
        carto
          .color(function(d) {
            var colorScale = d3.scaleSequential(d3[pal]).domain([Math.min.apply(null, values), Math.max.apply(null, values)]);
            if (typeof lgdTopo !== 'undefined') {
              lgdTopo.scale(colorScale);
              if (params.data.hasOwnProperty('legend_title')) {
                lgdTopo.title(params.data.legend_title);
              }
              svg.select(".legendSequential")
                 .call(lgdTopo);
            }
            return colorScale(d.properties[params.data.new_value]);
          });
      }
  });
  // Update vector used
  Shiny.addCustomMessageHandler('update-topogram-vector',
    function(params) {
      var carto = get_widget(params.id);
      if (typeof carto != 'undefined') {
        var paramsTopo = get_params(params.id);
        var lgdTopo = get_legend(params.id);
        var svg = get_svg(params.id);
        var pal = paramsTopo.palette;
        var fval = paramsTopo.format_value;
        var tlab = paramsTopo.tooltip_label;
        var colorScale = d3.scaleSequential(d3[pal]).domain(params.data.range);
        if (typeof lgdTopo !== 'undefined') {
          lgdTopo.scale(colorScale);
          if (params.data.hasOwnProperty('legend_title')) {
            lgdTopo.title(params.data.legend_title);
          }
          svg.select(".legendSequential")
             .call(lgdTopo);
        }
        carto
          .color(function(d) {
            return colorScale(params.data.new_value[d.id]);
          })
          .value(function(d) {
            return params.data.new_value[d.id];
          })
          .valFormatter(fval)
          .label(function(d) {
            return tlab[d.id];
          });
      }
  });
  // Update number of iteration
  Shiny.addCustomMessageHandler('update-topogram-iteration',
    function(params) {
      var carto = get_widget(params.id);
      if (typeof carto !== 'undefined') {
        carto.iterations(params.data.n_iteration);
      }
  });
}



