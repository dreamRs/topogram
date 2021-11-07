#' @title Cartogram htmlwidget for visualizing geographical data by distorting a TopoJson topology
#'
#' @description Continuous area cartograms with `d3.js`
#'
#' @param sfobj An `sf` object. For the time being, shape must be projected in Mercator (CRS 4326).
#' @param value Variable name to use to distort topology.
#' @param label `glue` string to be used in tooltip, you can use HTML tags in it.
#' @param palette Name of a color palette, such as `"viridis"`, `"Blues"`, ...
#'  Or a function to map data values to colors, see [scales::col_numeric()].
#' @param rescale_to Rescale value to distort topology to a specified range, use `NULL` to use values as is.
#' @param n_iteration Number of iterations to run the algorithm for. Higher numbers distorts the areas closer to their associated value,
#'  at the cost of performance.
#' @param projection Name of a projection, see available ones here: https://github.com/d3/d3-geo-projection.
#' @param layerId A formula, the layer id to specify value returned by `input$<ID>_click` in 'shiny' application.
#' @param width A numeric input in pixels.
#' @param height A numeric input in pixels.
#' @param elementId Use an explicit element ID for the widget.
#'
#' @export
#'
#' @importFrom htmlwidgets createWidget JS sizingPolicy
#' @importFrom geojsonio geojson_json geo2topo
#' @importFrom stats model.frame
#' @importFrom scales col_numeric rescale
#' @importFrom glue glue_data
#'
topogram <- function(sfobj, 
                     value, 
                     label = "{value}",
                     palette = "viridis",
                     rescale_to = c(1, 1000),
                     n_iteration = 10,
                     projection = "geoMercator",
                     layerId = NULL,
                     width = NULL,
                     height = NULL, 
                     elementId = NULL) {
  
  check_sf(sfobj)
  check_variables(sfobj, value)
  check_na(sfobj, value)
  
  if (!is.null(layerId)) {
    layerId <- model.frame(formula = layerId, data = sfobj)[[1]]
  }
  
  # add id for sfobjs
  sfobj$topogram_id <- seq_len(nrow(sfobj)) - 1
  
  # set colors
  values <- sfobj[[value]]
  values_range <- range(values, na.rm = TRUE)
  colors <- getColors(palette, values)
  sfobj$topogram_color <- colors$values
  
  # set label
  sfobj$topogram_label <- getLabels(sfobj, label, values)
  
  # rescale value
  if (is.numeric(rescale_to) && length(rescale_to) == 2) {
    sfobj[[value]] <- rescale(x = values, to = rescale_to)
  }
  
  # convert to geojson
  geo_json <- geojson_json(input = sfobj)
  
  # convert to topojson
  geo_topo <- geo2topo(x = geo_json, object_name = "states", quantization = 1e5)
  
  x <- list(
    sfobj = geo_topo,
    value = value,
    n_iteration = n_iteration,
    layerId = layerId,
    projection = projection,
    labs = FALSE,
    labsOpts = list(),
    legend = FALSE,
    legendOpts = list(
      labels = values_range,
      colors = colors$legend
    )
  )
  
  # create widget
  createWidget(
    name = "topogram",
    x = x,
    width = width,
    height = height,
    package = "topogram",
    elementId = elementId,
    sizingPolicy = sizingPolicy(
      defaultWidth = "100%",
      defaultHeight = "400px",
      viewer.defaultHeight = "100%",
      viewer.defaultWidth = "100%",
      browser.fill = TRUE,
      padding = 0,
      knitr.figure = FALSE
    )
  )
}


topogram_html <- function(id, style, class, ...) {
  tags$div(
    id = id,
    class = class,
    style = style,
    style = "position: relative;",
    tags$div(
      id = paste0(id, "-title"), 
      class = "topogram-title"
    ),
    tags$div(
      id = paste0(id, "-subtitle"), 
      class = "topogram-subtitle"
    ),
    tags$div(id = paste0(id, "-topogram")),
    tags$p(
      id = paste0(id, "-caption"),
      class = "topogram-caption"
    ),
    tags$div(
      id = paste0(id, "-legend"),
      class = "topogram-legend"
    )
  )
}
