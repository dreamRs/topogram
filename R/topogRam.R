#' Cartogram htmlwidget for visualizing geographical data by distorting a TopoJson topology
#'
#' Continuous area cartograms with `d3.js`
#'
#' @param shape An \code{sf} object.
#' @param value Variable name to use to distort topology.
#' @param tooltip_label Formula for tooltip's label.
#' @param format_value Character, D3 format to use, see \url{https://github.com/d3/d3-format}.
#' @param palette Color palette to use, see \url{https://github.com/d3/d3-scale-chromatic}, all \code{interpolate} palettes are available.
#' @param n_iteration Number of iterations to run the algorithm for. Higher numbers distorts the areas closer to their associated value,
#'  at the cost of performance.
#' @param width A numeric input in pixels.
#' @param height A numeric input in pixels.
#' @param elementId Use an explicit element ID for the widget.
#'
#' @export
#'
#' @importFrom htmlwidgets createWidget JS sizingPolicy
#' @importFrom geojsonio geojson_json geojson_list geo2topo
#' @importFrom stats model.frame
#' @importFrom utils packageVersion
#'
topogRam <- function(shape, value, tooltip_label = NULL, format_value = NULL,
                     palette = "Viridis", n_iteration = 20,
                     width = NULL, height = NULL, elementId = NULL) {

  if (packageVersion("geojsonio") < "0.6.0.9100")
    stop("You need geojsonio >= 0.6.0.9100 to use this function.", call. = FALSE)

  palette <- match.arg(
    arg = palette, choices = c(
      "Viridis", "Inferno", "Magma", "Plasma", "Warm", "Cool", "CubehelixDefault",
      "BuGn", "BuPu", "GnBu", "OrRd", "PuBuGn", "PuBu", "PuRd", "RdPu", "YlGnBu",
      "YlGn", "YlOrBr", "YlOrRd", "Rainbow", "Sinebow",
      "Reds", "Purples", "Oranges", "Greens", "Blues",
      "BrBG", "PRGn", "PiYG", "PuOr", "RdBu", "RdGy", "RdYlBu", "RdYlGn", "Spectral"
    )
  )

  if (!is.null(tooltip_label)) {
    tooltip_label <- model.frame(formula = tooltip_label, data = shape)[[1]]
  } else {
    if (!is.null(shape$name)) {
      tooltip_label <- shape$name
    } else {
      tooltip_label <- rep_len("", nrow(shape))
    }
  }

  if (is.null(format_value)) {
    format_value <- JS("function(n) {return n;}")
  } else {
    format_value <- JS(sprintf('d3.format("%s")', format_value))
  }

  geo_list <- geojson_list(input = shape)
  for (i in seq_along(geo_list$features)) {
    geo_list$features[[i]]$id <- i - 1
    geo_list$features[[i]]$properties$id <- i - 1
  }
  geo_json <- geojson_json(input = geo_list)

  # convert to topojson
  geo_topo <- geo2topo(x = geo_json, object_name = "states", quantization = 1e5)

  x = list(
    shape = geo_topo,
    value = value,
    palette = paste0("interpolate", palette),
    range = range(shape[[value]], na.rm = TRUE),
    tooltip_label = tooltip_label,
    format_value = format_value,
    n_iteration = n_iteration
  )


  # create widget
  createWidget(
    name = 'topogRam',
    x = x,
    width = width,
    height = height,
    package = 'topogRam',
    elementId = elementId,
    sizingPolicy = sizingPolicy(
      defaultWidth = "95%",
      viewer.defaultHeight = "100%",
      viewer.defaultWidth = "100%",
      knitr.figure = FALSE,
      viewer.suppress = TRUE,
      browser.external = TRUE,
      browser.fill = TRUE,
      padding = 10
    )
  )
}

#' Shiny bindings for topogRam
#'
#' Output and render functions for using topogRam within Shiny
#' applications and interactive Rmd documents.
#'
#' @param outputId output variable to read from
#' @param width,height Must be a valid CSS unit (like \code{'100\%'},
#'   \code{'400px'}, \code{'auto'}) or a number, which will be coerced to a
#'   string and have \code{'px'} appended.
#' @param expr An expression that generates a topogRam
#' @param env The environment in which to evaluate \code{expr}.
#' @param quoted Is \code{expr} a quoted expression (with \code{quote()})? This
#'   is useful if you want to save an expression in a variable.
#'
#' @name topogRam-shiny
#'
#' @importFrom htmlwidgets shinyWidgetOutput shinyRenderWidget
#'
#' @export
topogRamOutput <- function(outputId, width = '500px', height = '500px'){
  htmlwidgets::shinyWidgetOutput(outputId, 'topogRam', width, height, package = 'topogRam')
}

#' @rdname topogRam-shiny
#' @export
renderTopogRam <- function(expr, env = parent.frame(), quoted = FALSE) {
  if (!quoted) { expr <- substitute(expr) } # force quoted
  htmlwidgets::shinyRenderWidget(expr, topogRamOutput, env, quoted = TRUE)
}
