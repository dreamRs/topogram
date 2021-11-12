import * as utils from "./utils";

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

export function updateValues(obj) {
  var carto = getTopogram(obj.id);
  if (typeof carto == "undefined") return;
  carto
    .value(function(d) {
      var value = obj.data.values[d.properties.topogram_id];
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
    })
    .iterations(obj.data.n_iteration);
}

export function updateIteration(obj) {
  var carto = getTopogram(obj.id);
  if (typeof carto !== "undefined") {
    carto
      .iterations(obj.data.n_iteration);
  }
}

export function updateLegend(obj) {
  utils.setLegend(obj.id, obj.data.content);
}

export function updateLabs(obj) {
  utils.setLabs(obj.id, true, obj.data);
}
