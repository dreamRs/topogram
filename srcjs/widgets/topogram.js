import "widgets";
import Cartogram from "cartogram-chart";
import * as topojson from "topojson-client";
import * as proj1 from "d3-geo";
import * as proj2 from "d3-geo-projection";
const proj = { ...proj1, ...proj2 };

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
      legendSequential,
      svg;

    var padding = 0;

    function removeElement(elementId) {
      var element = document.getElementById(elementId);
      element.parentNode.removeChild(element);
    }

    return {

      renderValue: function(x) {

        // Color palette
        palette = x.palette;
        // Tooltip val formatter
        format_value = x.format_value;
        // Tooltip label
        tooltip_label = x.tooltip_label;

        if (!x.labs) {
          removeElement(el.id + "-title");
          removeElement(el.id + "-subtitle");
          removeElement(el.id + "-caption");
        } else {
          if (x.labsOpts.title !== null) {
            document.getElementById(el.id + "-title").innerHTML =
              x.labsOpts.title;
          } else {
            removeElement(el.id + "-title");
          }
          if (x.labsOpts.subtitle !== null) {
            document.getElementById(el.id + "-subtitle").innerHTML =
              x.labsOpts.subtitle;
          } else {
            removeElement(el.id + "-subtitle");
          }
          if (x.labsOpts.caption !== null) {
            document.getElementById(el.id + "-caption").innerHTML =
              x.labsOpts.caption;
          } else {
            removeElement(el.id + "-caption");
          }
        }

        topoWidth = width - padding;
        topoHeight = height - padding;

        projection = proj[x.projection]();
        statesbbox = topojson.feature(x.shape, x.shape.objects.states);
        projection.fitExtent(
          [[padding, padding], [topoWidth, topoHeight]],
          statesbbox
        );

        //var colorScale = d3.scaleSequential(d3[palette]).domain(x.range);

        carto = Cartogram()
          .width(width)
          .height(height)
          .topoJson(x.shape)
          .topoObjectName("states")
          .projection(projection)
          .iterations(x.n_iteration)
          .value(function(d) {
            //console.log(d);
            return d.properties[x.value];
          })
          //.color(function(d) {
          //  return colorScale(d.properties[x.value]);
          //})
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
