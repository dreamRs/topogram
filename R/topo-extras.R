
#' Utility function to create topogram parameters
#'
#' @param topo A \code{topogRam} \code{htmlwidget} object.
#' @param name Slot's name to edit
#' @param ... Arguments for the slot
#'
#' @return A \code{topogRam} \code{htmlwidget} object.
#'
#' @importFrom utils modifyList
#'
#' @noRd
.topo_opt <- function(topo, name, ...) {

  if(!any(class(topo) %in% c("topogRam", "topogRamSelect"))){
    stop("bb must be a topogRam object")
  }

  if (is.null(topo$x$bb_opts[[name]])) {
    topo$x[[name]] <- list(...)
  } else {
    topo$x[[name]] <- modifyList(x = topo$x[[name]], val = list(...), keep.null = TRUE)
  }

  return(topo)
}



#' Labs for topogRam
#'
#' @param topo A \code{topogRam} \code{htmlwidget} object.
#' @param title Main title.
#' @param subtitle Subtitle.
#' @param caption Brief explanation of the source of the data.
#'
#' @export
#'
#' @examples
#' #TODO
add_labs <- function(topo, title = NULL, subtitle = NULL, caption = NULL) {
  topo$x$labs <- TRUE
  .topo_opt(topo, "labsOpts", title = title, subtitle = subtitle, caption = caption)
}




#' Legend for topogRam
#'
#' @param topo A \code{topogRam} \code{htmlwidget} object.
#' @param title Legend title
#' @param n_cells Number of cells in the legend.
#' @param label_format A string passed to \code{d3.format},
#'  see \url{https://github.com/d3/d3-format}.
#' @param labels A character vector to use as labels, better if same length as number of cells.
#' @param orientation Legend orientation: vertical or horizontal, can be abbreviated.
#' @param cells_width Width of each cells.
#' @param cells_height Height of each cells.
#' @param cells_padding Space between each cells.
#' @param title_width Width for the title.
#'
#' @export
#'
#' @examples
#' # TODO
add_legend <- function(topo, title, n_cells = 10,
                       label_format = ".2f", labels = NULL,
                       orientation = "horizontal",
                       cells_width = 30, cells_height = 15, cells_padding = 2,
                       title_width = 100) {
  topo$x$legend <- TRUE
  .topo_opt(
    topo = topo,
    name = "legendOpts",
    title = title,
    n_cells = n_cells,
    label_format = label_format,
    labels = if(is.null(labels)) "" else labels,
    orientation = match.arg(orientation, c("horizontal", "vertical")),
    cells_width = cells_width,
    cells_height = cells_height,
    cells_padding = cells_padding,
    title_width = title_width
  )
}


