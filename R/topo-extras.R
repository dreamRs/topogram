
#' Utility function to create topogram parameters
#'
#' @param topo A \code{topogram} \code{htmlwidget} object.
#' @param name Slot's name to edit
#' @param ... Arguments for the slot
#'
#' @return A \code{topogram} \code{htmlwidget} object.
#'
#' @importFrom utils modifyList
#'
#' @noRd
.topo_opt <- function(topo, name, ...) {

  if (is.null(topo$x[[name]])) {
    topo$x[[name]] <- list(...)
  } else {
    topo$x[[name]] <- modifyList(x = topo$x[[name]], val = list(...), keep.null = TRUE)
  }

  return(topo)
}



#' @title Labs for topogram widget
#' 
#' @description Add title, subtitle and caption to a topogram.
#'
#' @param topo A [topogram()] `htmlwidget` object.
#' @param title Main title.
#' @param subtitle Subtitle.
#' @param caption Brief explanation of the source of the data.
#'
#' @export
#' 
#' @importFrom htmltools doRenderTags
#'
#' @example examples/labs.R
topogram_labs <- function(topo, title = NULL, subtitle = NULL, caption = NULL) {
  check_topogram(topo)
  topo$x$labs <- TRUE
  if (!is.null(title))
    title <- doRenderTags(title)
  if (!is.null(subtitle))
    subtitle <- doRenderTags(subtitle)
  if (!is.null(caption))
    caption <- doRenderTags(caption)
  .topo_opt(topo, "labsOpts", title = title, subtitle = subtitle, caption = caption)
}




#' @title Legend for topogram widget
#' 
#' @description Add a legend
#'
#' @param topo A [topogram()] `htmlwidget` object.
#' @param colors Vector of colors.
#' @param labels Labels associated to colors:
#'  - For gradient: a vector of length 2 for range of values.
#'  - For breaks: a vector of same length as colors, or length+1 to display the minimal value.
#'  - For discrete: a vector of same length as colors.
#' @param formatter Function to format labels.
#' @param title Title for the legend.
#' @param direction Direction: horizontal or vertical.
#' @param height,width Height, width for legend. For gradient legend it represent the size of the dradient according to direction.
#'
#' @export
#' 
#' @importFrom htmltools tags tagList doRenderTags
#' @importFrom scales colour_ramp
#'
topogram_legend <- function(topo,
                            colors = NULL,
                            labels = NULL,
                            formatter = NULL,
                            title = NULL,
                            direction = c("h", "v"),
                            height = "250px",
                            width = "250px") {
  check_topogram(topo)
  topo$x$legend <- TRUE
  direction <- match.arg(direction)
  if (is.null(colors))
    colors <- topo$x$legendOpts$colors
  if (is.null(labels))
    labels <- topo$x$legendOpts$labels
  if (is.function(formatter))
    labels <- formatter(labels)
  if (direction == "h") {
    tag_legend <- tagList(
      tags$div(
        style = paste("height: 12px; width: ", width, ";"),
        style = paste("background:", linear_gradient(colour_ramp(colors)(seq(0, 1, length = 100))))
      ),
      tags$div(
        tags$span(labels[1]),
        tags$span(labels[2], style = "float: right;")
      )
    )
  } else  {
    tag_legend <- tags$div(
      style = "width: 100%;",
      tags$div(
        style = paste("height: ", height, ";"),
        style = "width: 12px; float: left;",
        style = paste("background:", linear_gradient(colour_ramp(colors)(seq(0, 1, length = 100)), direction = "v"))
      ),
      tags$div(
        style = paste("height: ", height, ";"),
        style = "margin-left: 12px; padding-left: 2px; position: relative;",
        tags$div(labels[1]),
        tags$div(labels[2], style = "position: absolute; bottom: 0;")
      )
    )
  }
  .topo_opt(
    topo = topo,
    name = "legendOpts",
    content = doRenderTags(tags$div(
      style = "font-size: smaller; position: absolute; bottom: 0; left: 15px;",
      if (!is.null(title)) {
        tags$div(
          title,
          class = "topogram-legend-title",
          style = "font-weight: bolder;"
        )
      },
      tags$div(
        class = "topogram-legend-colors",
        tag_legend
      )
    ))
  )
}


