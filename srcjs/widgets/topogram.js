import "widgets";
import Cartogram from "cartogram-chart";
import * as topojson from "topojson-client";
import * as proj1 from "d3-geo";
import * as proj2 from "d3-geo-projection";
const proj = { ...proj1, ...proj2 };
import * as utils from "../modules/utils";

HTMLWidgets.widget({

  name: 'topogram',

  type: 'output',

  factory: function(el, width, height) {

    var carto,
      statesbbox,
      projection,
      topoWidth,
      topoHeight,
      palette,
      format_value,
      tooltip_label,
      svg;

    var padding = 20;

    return {

      renderValue: function(x) {

        // Color palette
        palette = x.palette;
        // Tooltip val formatter
        format_value = x.format_value;
        // Tooltip label
        tooltip_label = x.tooltip_label;

        // Set labs (title, subtitle, caption)
        utils.setLabs(el.id, x.labs, x.labsOpts);

        topoWidth = width - padding;
        topoHeight = height - padding;

        projection = proj[x.projection]();
        statesbbox = topojson.feature(x.shape, x.shape.objects.states);
        projection.fitExtent(
          [[padding, padding], [topoWidth, topoHeight]],
          statesbbox
        );

        carto = Cartogram()
          .width(width)
          .height(height)
          .topoJson(x.shape)
          .topoObjectName("states")
          .projection(projection)
          .iterations(x.n_iteration)
          .value(function(d) {
            return d.properties[x.value];
          })
          .color(function(d) {
            return d.properties.topogram_color;
          })
          .label(function(d) {
            //console.log(d);
            //return "Population of" + d.properties.name + "(" + d.properties[x.value] + ")";
            return tooltip_label[d.properties.topogram_id];
          })
          .valFormatter(format_value)
          .units(x.unit_value)(
          //.onClick(function(d) {console.info(d)})
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

      getChart: function() {
        return carto;
      },

      getSvg: function() {
        return svg;
      },

      getParams: function() {
        return {
          palette: palette,
          format_value: format_value,
          tooltip_label: tooltip_label
        };
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
