HTMLWidgets.widget({

  name: 'topogRamSelect',

  type: 'output',

  factory: function(el, width, height) {

    var carto, statesbbox, projection, topoWidth, topoHeight;

    return {

      renderValue: function(x) {

        // select menu
        var $selectMenu = $('#' + el.id + '_select');
        $selectMenu.empty().append(x.select_opts);
        $selectMenu.parent().parent().find('label[for="' + el.id + '_select' + '"]').text(x.select_label);

        topoWidth = width - width*0;
        topoHeight = height - height*0;

        projection = d3[x.projection]();
        statesbbox = topojson.feature(x.shape, x.shape.objects.states);
        projection.fitExtent([[40, 40], [topoWidth, topoHeight]], statesbbox);

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
          .units(x.unit_value)
          //.onClick(function(d) {console.info(d)})
          (document.getElementById(el.id));


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
        topoWidth = width - width*0;
        topoHeight = height - height*0;
        projection.fitExtent([[40, 40], [topoWidth, topoHeight]], statesbbox);
        carto.width(topoWidth).height(topoHeight).projection(projection);
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
