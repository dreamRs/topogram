
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
#'
#' @return A \code{topogramProxy} \code{htmlwidget} object.
#' @export
#'
#' @examples
#' if (interactive()) {
#'
#'
#'
#' }
proxy_update_value <- function(proxy, new_value) {
  stopifnot(is.character(new_value) && length(new_value) == 1)
  .topogram_proxy(proxy, "value", list(new_value = new_value))
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
#'
#'
#' }
proxy_update_iteration <- function(proxy, n_iteration) {
  stopifnot(is.numeric(n_iteration) && length(n_iteration) == 1)
  .topogram_proxy(proxy, "iteration", list(n_iteration = n_iteration))
}


