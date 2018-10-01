HTMLWidgets.widget({

  name: 'topogRam',

  type: 'output',

  factory: function(el, width, height) {

    var carto, statesbbox, projection;

    return {

      renderValue: function(x) {

        projection = d3.geoMercator();
        statesbbox = topojson.feature(x.shape, x.shape.objects.states);
        projection.fitSize([width, height], statesbbox);

        var colorScale = d3.scaleSequential(d3[x.palette]).domain(x.range);

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
          .onClick(function(d) {console.info(d)})
          (document.getElementById(el.id));

      },

      getChart: function(){
        return carto;
      },

      resize: function(width, height) {
        projection.fitSize([width, height], statesbbox);
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





if (HTMLWidgets.shinyMode) {
  // Update value used
  Shiny.addCustomMessageHandler('update-topogram-value',
    function(params) {
      var carto = get_widget(params.id);
      if (typeof carto != 'undefined') {
        carto
          .value(function(d) {
            return d.properties[params.data.new_value];
          });
      }
  });
  // Update number of iteration
  Shiny.addCustomMessageHandler('update-topogram-iteration',
    function(params) {
      var carto = get_widget(params.id);
      if (typeof carto != 'undefined') {
        carto.iterations(params.data.n_iteration);
      }
  });
}



