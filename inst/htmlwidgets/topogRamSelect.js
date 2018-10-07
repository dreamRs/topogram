HTMLWidgets.widget({

  name: 'topogramSelect',

  type: 'output',

  factory: function(el, width, height) {

    var carto, statesbbox, projection, topoWidth, topoHeight, palette;

    var padding = 30;

    Array.prototype.max = function() {
      return Math.max.apply(null, this);
    };

    Array.prototype.min = function() {
      return Math.min.apply(null, this);
    };

    function removeElement(elementId) {
      var element = document.getElementById(elementId);
      element.parentNode.removeChild(element);
    }

    return {

      renderValue: function(x) {

        palette = x.palette;

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

        // select menu
        var $selectMenu = $('#' + el.id + '_select');
        $selectMenu.empty().append(x.select_opts);
        $selectMenu.parent().parent().find('label[for="' + el.id + '_select' + '"]').text(x.select_label);

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
            return x.tooltip_label[d.id];
          })
          .valFormatter(x.format_value)
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
            var svg = d3.select("div#" + el.id + "-topogram>svg");

            svg.append("g")
              .attr("class", "legendSequential")
              .attr("transform", "translate(20,40)");

            var legendSequential = d3.legendColor()
                .title(x.legendOpts.title)
                .titleWidth(x.legendOpts.title_width)
                .locale(x.d3_locale)
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

          var selectValue = x.value;
          $('#' + el.id + '_select').on('change', function() {
            selectValue = this.value;
            values = [];
            carto
              .value(function(d) {
                values.push(d.properties[selectValue]);
                return d.properties[selectValue];
              });
            carto
              .color(function(d) {
                var colorScale = d3.scaleSequential(d3[palette]).domain([Math.min.apply(null, values), Math.max.apply(null, values)]);
                if (typeof legendSequential !== 'undefined') {
                  legendSequential.scale(colorScale);
                  svg.select(".legendSequential")
                    .call(legendSequential);
                }
                return colorScale(d.properties[selectValue]);
              });
          });

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
