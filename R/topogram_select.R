#' @title Select mmenu to update [topogram()]
#'
#' @description Use in RMarkdown documents to update a [topogram()] dynamically.
#'
#' @importFrom htmlwidgets createWidget
#'
#' @export
topogram_select <- function(topogramId,
                            sfobj,
                            values, 
                            label = "{value}", 
                            palette = "viridis",
                            rescale_to = c(1, 1000),
                            n_iteration = 10,
                            width = NULL) {

  topo <- lapply(
    X = values,
    FUN = function(x) {
      values <- sfobj[[x]]
      colors <- getColors(palette, values)
      labels <- getLabels(sfobj, label, values)
      if (is.numeric(rescale_to) && length(rescale_to) == 2) {
        values <- scales::rescale(x = values, to = rescale_to)
      }
      list(
        values = values,
        colors = colors$values,
        labels = labels
      )
    }
  )
  if (is.null(names(values))) {
    names(values) <- unlist(values)
  }
  data <- lapply(
    X = seq_along(values), 
    FUN = function(i) {
      list(text = names(values)[i], value = values[[i]])
    }
  )
  x <- list(
    topogramId = topogramId,
    topo = setNames(topo, values),
    data = data,
    n_iteration = n_iteration
  )

  # create widget
  htmlwidgets::createWidget(
    name = "topogram_select",
    x,
    width = width,
    height = NULL,
    package = "topogram",
    elementId = NULL,
    sizingPolicy = htmlwidgets::sizingPolicy(
      defaultWidth = "100%",
      defaultHeight = "auto",
      knitr.figure = FALSE
    )
  )
}


topogram_select_html <- function(id, style, class, ...) {
  tags$select(
    id = id,
    class = class,
    style = style,
    ...
  )
}

