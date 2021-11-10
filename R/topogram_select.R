
#' @title Select menu to update [topogram()]
#'
#' @description Use in RMarkdown documents to update a [topogram()] dynamically.
#' 
#' @param topogramId The `elementId` of the [topogram()] to update.
#' @param values Parameters to construct cartograms, can be:
#'   * a `character` vector of variable to use
#'   * a named `list` where names will be used in select menu and values as variable
#'   * a `list` of `lists` where each sub-list can contain: `value` (variable), `text` (label for select menu),
#'   `palette`, `labels` (parameters specific for the variable considered)
#' @inheritParams topogram
#'
#' @importFrom htmlwidgets createWidget sizingPolicy
#' @importFrom stats setNames
#'
#' @export
#' 
#' @example examples/selectmenu.R
topogram_select <- function(topogramId,
                            sfobj,
                            values, 
                            label = "{value}", 
                            palette = "viridis",
                            rescale_to = c(1, 1000),
                            n_iteration = 10,
                            width = NULL) {

  topo_opts <- get_topogram_options(values, palette = palette, label = label)
  topo <- lapply(
    X = topo_opts,
    FUN = function(x) {
      values <- sfobj[[x$value]]
      colors <- getColors(x$palette, values)
      labels <- getLabels(sfobj, x$label, values)
      if (is.numeric(rescale_to) && length(rescale_to) == 2) {
        values <- scales::rescale(x = values, to = rescale_to)
      }
      dropNulls(list(
        values = values,
        colors = colors$values,
        labels = labels,
        labs = x$labs
      ))
    }
  )
  data <- get_select_options(values)
  nms <- vapply(data, "[[", "value", FUN.VALUE = character(1))
  x <- list(
    topogramId = topogramId,
    topo = setNames(topo, nms),
    data = data,
    n_iteration = n_iteration
  )

  createWidget(
    name = "topogram_select",
    x,
    width = width,
    height = NULL,
    package = "topogram",
    elementId = NULL,
    sizingPolicy = sizingPolicy(
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

