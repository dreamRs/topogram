HTMLWidgets.widget({

  name: 'topogRam',

  type: 'output',

  factory: function(el, width, height) {


    return {

      renderValue: function(x) {

        var projection = d3.geoMercator();
        var statesbbox = topojson.feature(x.shape, x.shape.objects.states);
        projection.fitSize([width, height], statesbbox);

        var colorScale = d3.scaleSequential(d3[x.palette]).domain(x.range);

        Cartogram()
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
            console.log(d);
            //return "Population of" + d.properties.name + "(" + d.properties[x.value] + ")";
            return x.tooltip_label[d.id];
          })
          .valFormatter(x.format_value)
          .onClick(function(d) {console.info(d)})
          (document.getElementById(el.id));

      },


      resize: function(width, height) {

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
