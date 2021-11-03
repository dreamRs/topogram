#' @title Cartogram htmlwidget for visualizing geographical data by distorting a TopoJson topology
#'
#' @description Continuous area cartograms with `d3.js`
#'
#' @param shape An `sf` object. For the time being, shape must be projected in Mercator (CRS 4326).
#' @param value Variable name to use to distort topology.
#' @param label `glue` string to be used in tooltip, you can use HTML tags in it.
#' @param palette Name of a color palette, such as `"viridis"`, `"Blues"`, ... Or a function to map data values to colors, see [scales::col_numeric()].
#' @param n_iteration Number of iterations to run the algorithm for. Higher numbers distorts the areas closer to their associated value,
#'  at the cost of performance.
#' @param projection Name of a projection, see available ones here: https://github.com/d3/d3-geo-projection
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
#' @importFrom scales col_numeric
#' @importFrom glue glue_data
#'
topogram <- function(shape, 
                     value, 
                     label = "{value}",
                     palette = "viridis",
                     n_iteration = 20,
                     projection = "geoMercator", 
                     layerId = NULL,
                     width = NULL,
                     height = NULL, 
                     elementId = NULL) {
  
  check_sf(shape)
  check_variables(shape, value)
  check_na(shape, value)
  
  if (!is.null(layerId)) {
    layerId <- model.frame(formula = layerId, data = shape)[[1]]
  }
  
  # add id for shapes
  shape$topogram_id <- seq_len(nrow(shape)) - 1
  # set colors
  values <- shape[[value]]
  values_range <- range(values, na.rm = TRUE)
  if (is.character(palette)) {
    col_fun <- scales::col_numeric(
      palette = palette,
      domain = values_range
    )
    shape$topogram_color <- col_fun(values)
    colors <- col_fun(seq(from = values_range[1], to = values_range[2], length.out = 20))
  } else if (is.function(palette)) {
    shape$topogram_color <- palette(values)
    colors <- palette(seq(from = values_range[1], to = values_range[2], length.out = 20))
  } else {
    stop("'palette' must be a character (palette name) or a function (like ?scales::col_numeric)")
  }
  # set label
  label <- htmltools::doRenderTags(tags$div(
    style = "margin-top:-25px;",
    label
  ))
  shape$topogram_label <- glue::glue_data(shape, label, value = values)
  # convert to geojson
  geo_json <- geojson_json(input = shape)
  
  # convert to topojson
  geo_topo <- geo2topo(x = geo_json, object_name = "states", quantization = 1e5)
  
  x <- list(
    shape = geo_topo,
    value = value,
    n_iteration = n_iteration,
    layerId = layerId,
    projection = projection,
    labs = FALSE,
    labsOpts = list(),
    legend = FALSE,
    legendOpts = list(
      labels = values_range,
      colors = colors
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
      padding = 10
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
      class = "topogram-title", 
      style = "font-weight: bold; font-size: 160%;"
    ),
    tags$div(
      id = paste0(id, "-subtitle"), 
      class = "topogram-subtitle",
      style = "font-size: 110%;"
    ),
    tags$div(id = paste0(id, "-topogram")),
    tags$p(
      id = paste0(id, "-caption"),
      class = "topogram-caption",
      style = "position: absolute; bottom: 0; right: 15px;"
    )
  )
}
