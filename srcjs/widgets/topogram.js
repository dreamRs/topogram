import "widgets";
import Cartogram from "cartogram-chart";
import * as topojson from "topojson-client";
import * as proj1 from "d3-geo";
import * as proj2 from "d3-geo-projection";
const proj = { ...proj1, ...proj2 };
import * as utils from "../modules/utils";
import * as proxy from "../modules/proxy";

HTMLWidgets.widget({

  name: 'topogram',

  type: 'output',

  factory: function(el, width, height) {

    var carto,
      statesbbox,
      projection,
      topoWidth,
      topoHeight;

    var padding = 20;

    return {

      renderValue: function(x) {
        
        if (typeof carto !== "undefined") {
          document.getElementById(el.id + "-topogram").innerHTML = "";
        }

        // Set labs (title, subtitle, caption)
        utils.setLabs(el.id, x.labs, x.labsOpts);
        
        if (x.legend) {
          el.innerHTML += x.legendOpts.content;
        }

        // sizing
        topoWidth = el.clientWidth - padding;
        topoHeight = el.clientHeight - padding;

        projection = proj[x.projection]();
        statesbbox = topojson.feature(x.sfobj, x.sfobj.objects.states);
        projection.fitExtent(
          [[padding, padding], [topoWidth, topoHeight]],
          statesbbox
        );

        carto = Cartogram()
          .width(el.clientWidth)
          .height(el.clientHeight)
          .topoJson(x.sfobj)
          .topoObjectName("states")
          .projection(projection)
          .iterations(x.n_iteration)
          .value(function(d) {
            var value = d.properties[x.value];
            if (value <= 0) {
              value = 0.001;
            }
            return value;
          })
          .color(function(d) {
            return d.properties.topogram_color;
          })
          .tooltipContent(function(d) {
            return d.properties.topogram_label;
          })
          .valFormatter(function() {
           return "";
          })(
          document.getElementById(el.id + "-topogram")
        );

        if (HTMLWidgets.shinyMode) {
          carto.onClick(function(d) {
            if (x.layerId === null) {
              Shiny.onInputChange(el.id + "_click", d.properties);
            } else {
              Shiny.onInputChange(
                el.id + "_click",
                x.layerId[d.properties.topogram_id]
              );
            }
          });
        }

      },

      getTopogram: function() {
        return carto;
      },

      resize: function(width, height) {
        topoWidth = width - padding;
        topoHeight = height - padding;
        projection.fitExtent(
          [[padding, padding], [topoWidth, topoHeight]],
          statesbbox
        );
        carto
          .width(width)
          .height(height)
          .projection(projection);
      }

    };
  }
});

if (HTMLWidgets.shinyMode) {
  Shiny.addCustomMessageHandler("proxy-topogram-values", proxy.updateValues);
  Shiny.addCustomMessageHandler("proxy-topogram-iteration", proxy.updateIteration);
}
