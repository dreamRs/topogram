
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

  if(!any(class(topo) %in% c("topogRam", "topogram_Proxy"))){
    stop("bb must be a topogRam or a topogramProxy object")
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



