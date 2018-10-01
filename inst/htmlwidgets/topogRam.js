HTMLWidgets.widget({

  name: 'topogRam',

  type: 'output',

  factory: function(el, width, height) {

    var carto, statesbbox, projection;

    function removeElement(elementId) {
      var element = document.getElementById(elementId);
      element.parentNode.removeChild(element);
    }

    return {

      renderValue: function(x) {

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

        projection = d3[x.projection]();
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



