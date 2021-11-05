
#' Shiny bindings for topogram
#'
#' Output and render functions for using topogram within Shiny
#' applications and interactive Rmd documents.
#'
#' @param outputId output variable to read from
#' @param width,height Must be a valid CSS unit (like \code{'100\%'},
#'   \code{'400px'}, \code{'auto'}) or a number, which will be coerced to a
#'   string and have \code{'px'} appended.
#' @param expr An expression that generates a topogram
#' @param env The environment in which to evaluate \code{expr}.
#' @param quoted Is \code{expr} a quoted expression (with \code{quote()})? This
#'   is useful if you want to save an expression in a variable.
#' @param shinyId single-element character vector indicating the output ID of the
#'   chart to modify (if invoked from a Shiny module, the namespace will be added
#'   automatically)
#' @param session the Shiny session object to which the chart belongs; usually the
#'   default value will suffice
#'
#' @name topogram-shiny
#'
#' @importFrom htmlwidgets shinyWidgetOutput shinyRenderWidget
#' @importFrom shiny getDefaultReactiveDomain
#'
#' @export
topogramOutput <- function(outputId, width = "100%", height = "400px"){
  htmlwidgets::shinyWidgetOutput(outputId, "topogram", width, height, package = "topogram")
}

#' @rdname topogram-shiny
#' @export
renderTopogram <- function(expr, env = parent.frame(), quoted = FALSE) {
  if (!quoted) { expr <- substitute(expr) } # force quoted
  htmlwidgets::shinyRenderWidget(expr, topogramOutput, env, quoted = TRUE)
}


#' @rdname topogram-shiny
#' @export
topogram_proxy <- function(shinyId, session = shiny::getDefaultReactiveDomain()) {

  if (is.null(session)) {
    stop("topogramProxy must be called from the server function of a Shiny app")
  }

  if (!is.null(session$ns) && nzchar(session$ns(NULL)) && substring(shinyId, 1, nchar(session$ns(""))) != session$ns("")) {
    shinyId <- session$ns(shinyId)
  }

  structure(
    list(
      session = session,
      id = shinyId,
      x = list()
    ),
    class = "topogram_Proxy"
  )
}


#' Call a proxy method
#'
#' @param proxy  A \code{topogramProxy} \code{htmlwidget} object.
#' @param name Proxy method.
#' @param l Arguments passed to method.
#'
#' @return A \code{topogramProxy} \code{htmlwidget} object.
#' @noRd
.topogram_proxy <- function(proxy, name, l) {

  proxy$session$sendCustomMessage(
    type = sprintf("proxy-topogram-%s", name),
    message = list(id = proxy$id, data = l)
  )

  proxy
}




#' Update variable used to distort topology with proxy
#'
#' Use this in 'shiny' application to update an already generated cartogram.
#'
#' @param proxy A `topogram_proxy` `htmlwidget` object.
#' @inheritParams topogram
#'
#' @return A `topogram_proxy` `htmlwidget` object.
#' @export
#'
#' @examples
topogram_proxy_update <- function(proxy, sfobj, value, label = "{value}", palette = "viridis") {
  if (is.character(proxy)) {
    proxy <- topogram_proxy(proxy)
  }
  if (is.character(value) && length(value) == 1) {
    values <- sfobj[[value]]
    colors <- getColors(palette, values)
    .topogram_proxy(proxy, "variable",  l = list(
      variable = value,
      colors = colors$values,
      labels = getLabels(sfobj, label, values)
    ))
  } else if (is.vector(value) && is.numeric(value)) {
    .topogram_proxy(proxy, "vector",  l = list(vector = value))
  } else {
    stop("topogram_proxy_update: 'value' must a character of length 1 or a numeric vector.", call. = FALSE)
  }

}



#' Update number of iteration to distort topology
#'
#' Use this in 'shiny' application to update an already generated cartogram.
#'
#' @param proxy A \code{topogramProxy} \code{htmlwidget} object.
#' @param n_iteration Number of iteration to perform.
#'
#' @return A \code{topogramProxy} \code{htmlwidget} object.
#' @export
#'
#' @examples
#' if (interactive()) {
#'
#' library(topogram)
#' library(sf)
#' library(rnaturalearth)
#'
#' wrld <- st_as_sf(countries110)
#' # doesn't support missing values !
#' wrld <- wrld[, c("name", "pop_est", "gdp_md_est")]
#' # Antarctica is not a whole polygon
#' wrld <- wrld[wrld$name != "Antarctica", ]
#'
#' # add dummy vars
#' wrld$foo <- floor(runif(nrow(wrld), 500, 5000))
#'
#'
#' library(shiny)
#'
#' library(shiny)
#'
#' ui <- fluidPage(
#'   fluidRow(
#'     column(
#'       width = 10, offset = 1,
#'       tags$h2("topogram : update number of iterations with proxy"),
#'       sliderInput(
#'         inputId = "n_iteration", label = "Number of iteration (more takes longer)",
#'         min = 1, max = 60, value = 20
#'       ),
#'       topogramOutput(outputId = "carto", height = "600px")
#'     )
#'   )
#' )
#'
#' server <- function(input, output, session) {
#'
#'   # Initialize
#'   output$carto <- renderTopogRam({
#'     topogram(
#'       shape = wrld,
#'       value = "foo",
#'       tooltip_label = ~name,
#'       n_iteration = 20
#'     )
#'   })
#'
#'   # Update
#'   observeEvent(input$n_iteration, {
#'     topogramProxy(shinyId = "carto") %>%
#'       proxy_update_iteration(n_iteration = input$n_iteration)
#'   }, ignoreInit = TRUE)
#'
#' }
#'
#' shinyApp(ui, server)
#'
#' }
proxy_update_iteration <- function(proxy, n_iteration) {
  stopifnot(is.numeric(n_iteration) && length(n_iteration) == 1)
  .topogram_proxy(proxy, "iteration", list(n_iteration = n_iteration))
}


