#' Cartogram htmlwidget for visualizing geographical data by distorting a TopoJson topology
#'
#' Continuous area cartograms with `d3.js`
#'
#' @param shape An \code{sf} object. For the time being, shape must be projected in Mercator (CRS 4326).
#' @param value Variable name to use to distort topology. You can use a character vector or a named list of length > 1,
#'  in that case a dropdownmenu will be added to select a variable.
#' @param tooltip_label Formula for tooltip's label.
#' @param format_value A string passed to \code{d3.format},
#'  see \url{https://github.com/d3/d3-format}.
#' @param unit_value Character, the value unit, to include in the tooltip.
#' @param palette Color palette to use, see \url{https://github.com/d3/d3-scale-chromatic}, all \code{interpolate} palettes are available.
#' @param n_iteration Number of iterations to run the algorithm for. Higher numbers distorts the areas closer to their associated value,
#'  at the cost of performance.
#' @param projection D3 projection to use among : \code{"Mercator"}, \code{"Albers"}, \code{"ConicEqualArea"}, \code{"NaturalEarth1"},
#'  \code{"Eckert1"}, \code{"Eckert2"}, \code{"Eckert3"}, \code{"Eckert4"}, \code{"Eckert5"}, \code{"Eckert6"}, \code{"Wagner4"},
#'  \code{"Wagner6"}, \code{"Wagner7"}, \code{"Armadillo"}.
#' @param d3_locale Locale for \code{d3_format}, for exemple \code{"fr-FR"} for french,
#'  see possible values here \url{https://github.com/d3/d3-format/tree/master/locale}.
#' @param select_label Label for the dropdown menu if \code{length(value) > 1}.
#' @param layerId A formula, the layer id to specify value returned by \code{input$<ID>_click} in 'shiny' application.
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
#' @examples
#'
#' ## Example from sf
#'
#' library(topogRam)
#' library(sf)
#'
#' demo(nc, ask = FALSE, echo = FALSE)
#'
#' # Create a cartogram
#' topogRam(
#'   shape = nc,
#'   value = "NWBIR74",
#'   tooltip_label = ~NAME
#' )
#'
#'
#' # if you pass several values, a dropdown menu
#' # will be added on top of the cartogram
#' # to interactively select variable to use
#' topogRam(
#'   shape = nc,
#'   value = c("BIR74", "NWBIR74", "BIR79", "NWBIR79"),
#'   tooltip_label = ~NAME
#' )
#'
#'
#' ## World example
#'
#' library(topogRam)
#' library(sf)
#' library(rnaturalearth)
#'
#' wrld <- st_as_sf(countries110)
#' # doesn't support missing values !
#' wrld <- wrld[!is.na(wrld$pop_est), c("name", "pop_est", "gdp_md_est")]
#' # Antarctica is not a whole polygon
#' wrld <- wrld[wrld$name != "Antarctica", ]
#'
#' topogRam(
#'   shape = wrld,
#'   value = "pop_est",
#'   tooltip_label = ~name,
#'   n_iteration = 50
#' )
#'
#' topogRam(
#'   shape = wrld,
#'   value = c("pop_est", "gdp_md_est"),
#'   tooltip_label = ~name,
#'   n_iteration = 30
#' )

topogRam <- function(shape, value, tooltip_label = NULL,
                     format_value = NULL, unit_value = "",
                     palette = "Viridis", n_iteration = 20,
                     projection = "Mercator", d3_locale = NULL,
                     select_label = NULL, layerId = NULL,
                     width = NULL, height = NULL, elementId = NULL) {

  check_sf(shape)
  check_variables(shape, value)
  check_na(shape, value)

  if (packageVersion("geojsonio") < "0.6.0.9100")
    stop("You need geojsonio >= 0.6.0.9100 to use this function.", call. = FALSE)

  projection <- match.arg(
    arg = projection,
    choices = c("Mercator", "Albers", "ConicEqualArea", "NaturalEarth1",
                "Eckert1", "Eckert2", "Eckert3", "Eckert4", "Eckert5", "Eckert6",
                "Wagner4", "Wagner6", "Wagner7", "Armadillo")
  )
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

  if (!is.null(layerId)) {
    layerId <- model.frame(formula = layerId, data = shape)[[1]]
  }

  if (!is.null(d3_locale)) {
    check_locale(d3_locale)
    path <- system.file(file.path("htmlwidgets/locale", paste0(d3_locale, ".json")), package = "topogRam")
    if (path != "") {
      d3_locale <- jsonlite::fromJSON(txt = path)
    }
  }

  if (is.null(format_value)) {
    format_value <- JS("function(n) {return n;}")
  } else {
    if (is.null(d3_locale)) {
      format_value <- sprintf('d3.format("%s")', format_value)
    } else {
      format_value <- paste0('d3.formatLocale(', jsonlite::toJSON(x = d3_locale), sprintf(').format("%s")', format_value))
    }
    format_value <- JS(format_value)
  }

  if (length(value) > 1) {
    select <- TRUE
    values <- choicesWithNames(value)
    select_opts <- selectOptions(values)
    value <- unlist(value, use.names = FALSE)[1]
    select_label <- if (is.null(select_label)) "" else select_label
  } else {
    select_opts <- list()
    select <- FALSE
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
    unit_value = unit_value,
    n_iteration = n_iteration,
    select_opts = select_opts,
    select_label = select_label,
    layerId = layerId,
    projection = paste0("geo", projection),
    labs = FALSE,
    labsOpts = list(),
    d3_locale = jsonlite::toJSON(x = d3_locale, auto_unbox = FALSE),
    legend = FALSE,
    legendOpts = list()
  )


  # create widget
  createWidget(
    name = if (select) "topogRamSelect" else "topogRam",
    x = x,
    width = width,
    height = height,
    package = "topogRam",
    elementId = elementId,
    sizingPolicy = sizingPolicy(
      defaultWidth = "95%",
      # defaultHeight = "90%",
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


topogRam_html <- function(id, style, class, ...) {
  tags$div(
    id = id, class = class, style = style,
    # tags$div(
      # style = "position: absolute;",
      tags$div(id = paste0(id, "-title"), class = "topogram-title", style = "font-weight: bold; font-size: 160%;"),
      tags$div(id = paste0(id, "-subtitle"), class = "topogram-subtitle", style = "font-size: 110%;"),
    # ),
    tags$div(id = paste0(id, "-topogram")),
    tags$p(id = paste0(id, "-caption"), class = "topogram-caption", style = "position: absolute; bottom: 0; right: 15px;")
  )
}

# , style = "margin-top: 20px; margin-bottom: 10px;"

#' @importFrom shiny selectInput
#' @importFrom htmltools tags attachDependencies tagAppendAttributes
#' @importFrom rmarkdown html_dependency_jquery
topogRamSelect_html <- function(id, style, class, ...) {
  selectMenu <- selectInput(
    inputId = paste0(id, "_select"), label = "",
    choices = NULL, selectize = FALSE, width = "300px"
  )
  selectMenu$children[[2]]$children[[1]] <- tagAppendAttributes(
    tag = selectMenu$children[[2]]$children[[1]],
    class = "custom-select"
  )
  attachDependencies(
    x = tags$div(
      selectMenu,
      tags$div(
        id = id, class = class, style = style
      )
    ),
    value = html_dependency_jquery()
  )
}

