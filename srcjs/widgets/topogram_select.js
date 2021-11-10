import "widgets";
import SlimSelect from "slim-select";
import "../modules/slimselect.min.css";
import {getTopogram} from "../modules/proxy";
import * as utils from "../modules/utils";

HTMLWidgets.widget({

  name: "topogram_select",

  type: "output",

  factory: function(el, width, height) {

    return {

      renderValue: function(x) {

        var select = new SlimSelect({
          select: el,
          data: x.data,
          showSearch: false,
          onChange: function(info) {
            var carto = getTopogram(x.topogramId);
            if (typeof carto == "undefined") return;
            var topo = x.topo[info.value];
            carto
              .value(function(d) {
                var value = topo.values[d.properties.topogram_id];
                if (value <= 0) {
                  value = 0.001;
                }
                return value;
              })
              .color(function(d) {
                return topo.colors[d.properties.topogram_id];
              })
              .tooltipContent(function(d) {
                return topo.labels[d.properties.topogram_id];
              });
            utils.setLabs(x.topogramId, topo.hasOwnProperty("labs"), topo.labs);
          }
        });

      },

      resize: function(width, height) {

      }

    };
  }
});
