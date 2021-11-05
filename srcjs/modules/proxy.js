export function getTopogram(id) {
  // Get the HTMLWidgets object
  var htmlWidgetsObj = HTMLWidgets.find("#" + id);

  // Use the getChart method we created to get the underlying billboard chart
  var widgetObj;

  if (typeof htmlWidgetsObj != "undefined") {
    widgetObj = htmlWidgetsObj.getTopogram();
  }

  return widgetObj;
}

export function updateVariable(obj) {
  var carto = getTopogram(obj.id);
  carto
    .value(function(d) {
      var value = d.properties[obj.data.variable];
      if (value <= 0) {
        value = 0.001;
      }
      return value;
    })
    .color(function(d) {
      return obj.data.colors[d.properties.topogram_id];
    })
    .tooltipContent(function(d) {
      return obj.data.labels[d.properties.topogram_id];
    });
}

