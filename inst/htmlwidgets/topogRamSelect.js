HTMLWidgets.widget({

  name: 'topogRamSelect',

  type: 'output',

  factory: function(el, width, height) {

    var carto, statesbbox, projection;

    return {

      renderValue: function(x) {

        // select menu
        var $selectMenu = $('#' + el.id + '_select');
        $selectMenu.empty().append(x.select_opts);
        $selectMenu.parent().parent().find('label[for="' + el.id + '_select' + '"]').text(x.select_label);

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


          var selectValue = x.value;
          $('#' + el.id + '_select').on('change', function() {
            selectValue = this.value;
            carto
              .value(function(d) {
                //console.log(d);
                return d.properties[selectValue];
              });
          });

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
