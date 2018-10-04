
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
#' @param shinyId single-element character vector indicating the output ID of the
#'   chart to modify (if invoked from a Shiny module, the namespace will be added
#'   automatically)
#' @param session the Shiny session object to which the chart belongs; usually the
#'   default value will suffice
#'
#' @name topogRam-shiny
#'
#' @importFrom htmlwidgets shinyWidgetOutput shinyRenderWidget
#' @importFrom shiny getDefaultReactiveDomain
#'
#' @export
topogRamOutput <- function(outputId, width = '100%', height = '400px'){
  htmlwidgets::shinyWidgetOutput(outputId, 'topogRam', width, height, package = 'topogRam')
}

#' @rdname topogRam-shiny
#' @export
renderTopogRam <- function(expr, env = parent.frame(), quoted = FALSE) {
  if (!quoted) { expr <- substitute(expr) } # force quoted
  htmlwidgets::shinyRenderWidget(expr, topogRamOutput, env, quoted = TRUE)
}


#' @rdname topogRam-shiny
#' @export
topogramProxy <- function(shinyId, session = shiny::getDefaultReactiveDomain()) {

  if (is.null(session)) {
    stop("billboarderProxy must be called from the server function of a Shiny app")
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
    type = sprintf("update-topogram-%s", name),
    message = list(id = proxy$id, data = l)
  )

  proxy
}




#' Update variable used to distort topology with proxy
#'
#' Use this in 'shiny' application to update an already generated cartogram.
#'
#' @param proxy A \code{topogramProxy} \code{htmlwidget} object.
#' @param new_value New variable to use, must a \code{character} of length one,
#'  and a valid variable name of data used to construct the cartogram.
#' @param legend_title New title for the legend.
#'
#' @return A \code{topogramProxy} \code{htmlwidget} object.
#' @export
#'
#' @examples
#' if (interactive()) {
#'
#' library(topogRam)
#' library(sf)
#' library(rnaturalearth)
#'
#' wrld <- st_as_sf(countries110)
#' # doesn't support missing values !
#' wrld <- wrld[, c("name", "pop_est", "gdp_md_est")]
#' # Antarctica is not a whole polygon
#' wrld <- wrld[wrld$name != "Antarctica", ]
#'
#' # add dummies vars
#' wrld$foo1 <- floor(runif(nrow(wrld), 500, 5000))
#' wrld$foo2 <- floor(runif(nrow(wrld), 500, 5000))
#' wrld$foo3 <- floor(runif(nrow(wrld), 500, 5000))
#' wrld$foo4 <- floor(runif(nrow(wrld), 500, 5000))
#'
#' library(shiny)
#'
#'
#'
#' #### Update with variable name
#'
#' ui <- fluidPage(
#'   tags$h2("Update value use to distort topology"),
#'   tags$h4("Use a column name of the original data"),
#'   radioButtons(
#'     inputId = "new_value",
#'     label = "Update value:",
#'     choices = paste0("foo", 1:4),
#'     inline = TRUE
#'   ),
#'   topogRamOutput(outputId = "world", height = "800px")
#' )
#'
#' server <- function(input, output, session) {
#'
#'   # Initialize the cartogram (non reactive)
#'   output$world <- renderTopogRam({
#'     topogRam(
#'       shape = wrld,
#'       value = "foo1",
#'       tooltip_label = ~name,
#'       n_iteration = 10
#'     )
#'   })
#'
#'   # Update variable used (foo1, foo2, foo3, foo4)
#'   observeEvent(input$new_value, {
#'     topogramProxy(shinyId = "world") %>%
#'       proxy_update_value(new_value = input$new_value)
#'   }, ignoreInit = TRUE)
#'
#' }
#'
#' shinyApp(ui, server)
#'
#'
#'
#'
#' #### Update with a numeric vector
#'
#' ui <- fluidPage(
#'   tags$h2("Update value use to distort topology"),
#'   tags$h4("Use a vector to update data"),
#'   actionButton(inputId = "update", label = "Update !"),
#'   topogRamOutput(outputId = "world", height = "800px")
#' )
#'
#' server <- function(input, output, session) {
#'
#'   # Initialize the cartogram (non reactive)
#'   output$world <- renderTopogRam({
#'     topogRam(
#'       shape = wrld,
#'       value = "foo1",
#'       tooltip_label = ~name,
#'       n_iteration = 10
#'     )
#'   })
#'
#'   # Update with a vector (must be same length as data used in topogRam)
#'   observeEvent(input$update, {
#'     topogramProxy(shinyId = "world") %>%
#'       proxy_update_value(new_value = floor(runif(nrow(wrld), 500, 5000)))
#'   }, ignoreInit = TRUE)
#'
#' }
#'
#' shinyApp(ui, server)
#'
#' }
proxy_update_value <- function(proxy, new_value, legend_title = NULL) {
  if (is.character(new_value) && length(new_value) == 1) {
    .topogram_proxy(proxy, "value",  l = dropNulls(list(
      new_value = new_value, legend_title = legend_title
    )))
  } else if (is.vector(new_value) && is.numeric(new_value)) {
    .topogram_proxy(proxy, "vector",  l = dropNulls(list(
      new_value = new_value, range = range(new_value, na.rm = TRUE),
      legend_title = legend_title
    )))
  } else {
    stop("'new_value' must a character of length 1 or a numeric vector.", call. = FALSE)
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
#' library(topogRam)
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
#'       tags$h2("topogRam : update number of iterations with proxy"),
#'       sliderInput(
#'         inputId = "n_iteration", label = "Number of iteration (more takes longer)",
#'         min = 1, max = 60, value = 20
#'       ),
#'       topogRamOutput(outputId = "carto", height = "600px")
#'     )
#'   )
#' )
#'
#' server <- function(input, output, session) {
#'
#'   # Initialize
#'   output$carto <- renderTopogRam({
#'     topogRam(
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


