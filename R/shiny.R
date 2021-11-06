
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




#' @title Update topogram with proxy
#'
#' @description Use this in 'shiny' application to update an already generated [topogram()].
#'
#' @param proxy A `topogram_proxy` `htmlwidget` object.
#' @inheritParams topogram
#'
#' @return A `topogram_proxy` `htmlwidget` object.
#' @export
#'
#' @example examples/proxy-update.R
topogram_proxy_update <- function(proxy, 
                                  sfobj, 
                                  value, 
                                  label = "{value}", 
                                  palette = "viridis",
                                  rescale_to = c(1, 1000),
                                  n_iteration = 10) {
  if (is.character(proxy)) {
    proxy <- topogram_proxy(proxy)
  }
  if (is.character(value) && length(value) == 1) {
    values <- sfobj[[value]]
  } else if (is.vector(value) && is.numeric(value)) {
    values <- value
  } else {
    stop("topogram_proxy_update: 'value' must a character of length 1 or a numeric vector.", call. = FALSE)
  }
  colors <- getColors(palette, values)
  if (is.numeric(rescale_to) && length(rescale_to) == 2) {
    values <- scales::rescale(x = values, to = rescale_to)
  }
  .topogram_proxy(proxy, "values",  l = list(
    values = values,
    colors = colors$values,
    labels = getLabels(sfobj, label, values),
    n_iteration = n_iteration
  ))
}



#' @title Update number of iteration with proxy
#'
#' @description Use this in 'shiny' application to update an already generated [topogram()].
#'
#' @param proxy A `topogram_proxy` `htmlwidget` object.
#' @inheritParams topogram
#'
#' @return A `topogram_proxy` `htmlwidget` object.
#' @export
#'
#' @example examples/proxy-iteration.R
topogram_proxy_iteration <- function(proxy, n_iteration) {
  if (is.character(proxy)) {
    proxy <- topogram_proxy(proxy)
  }
  stopifnot(is.numeric(n_iteration) && length(n_iteration) == 1)
  .topogram_proxy(proxy, "iteration", list(n_iteration = n_iteration))
}


