
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
#' @return A [topogram()] / [topogram_proxy()] `htmlwidget` object.
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
  if (inherits(topo, "topogram_Proxy")) {
    .topogram_proxy(topo, "labs",  l = list(
      title = title, subtitle = subtitle, caption = caption
    ))
  } else {
    .topo_opt(topo, "labsOpts", title = title, subtitle = subtitle, caption = caption)
  }
}




#' @title Legend for topogram widget
#' 
#' @description Add a gradient legend in a [topogram()] widget.
#'
#' @param topo A [topogram()] / [topogram_proxy()] `htmlwidget` object.
#' @param colors Vector of colors used in legend, default is to use colors used in [topogram()].
#' @param labels Labels to display for values, default is to use range of values used in [topogram()].
#' @param formatter Function to format labels, like [scales::label_number()].
#' @param title Title for the legend.
#' @param direction Direction: horizontal or vertical.
#' @param height,width Height, width for legend. For gradient legend it
#'  represent the size of the dradient according to direction.
#' 
#' @return A [topogram()] / [topogram_proxy()] `htmlwidget` object.
#'
#' @export
#' 
#' @importFrom htmltools tags tagList doRenderTags
#' 
#' @example examples/legend.R
topogram_legend <- function(topo,
                            colors = NULL,
                            labels = NULL,
                            formatter = NULL,
                            title = NULL,
                            direction = c("h", "v"),
                            height = "250px",
                            width = "250px") {
  check_topogram(topo)
  direction <- match.arg(direction)
  if (is.null(colors))
    colors <- topo$x$legendOpts$colors
  if (is.null(labels))
    labels <- topo$x$legendOpts$labels
  if (is.function(formatter))
    labels <- formatter(labels)
  topo$x$legend <- TRUE
  content <- create_legend(
    colors = colors, 
    labels = labels, 
    title= title, 
    direction = direction, 
    height = height, 
    width = width
  )
  if (inherits(topo, "topogram_Proxy")) {
    .topogram_proxy(topo, "legend",  l = list(
      content = content
    ))
  } else {
    .topo_opt(
      topo = topo,
      name = "legendOpts",
      content = content
    )
  }
}

#' @importFrom scales colour_ramp
#' @importFrom htmltools css validateCssUnit tagList tags doRenderTags
create_legend <- function(colors, 
                          labels, 
                          title = NULL,
                          direction = c("h", "v"), 
                          height = "250px", width = "250px") {
  direction <- match.arg(direction)
  height <- validateCssUnit(height)
  width <- validateCssUnit(width)
  colors <- colour_ramp(colors)(seq(0, 1, length = 100))
  if (direction == "h") {
    tag_legend <- tagList(
      tags$div(
        class = "topogram-legend-gradient",
        style = css(
          height = "12px",
          width = width,
          background = linear_gradient(colors)
        )
      ),
      tags$div(
        class = "topogram-legend-labels-h",
        tags$span(labels[1]),
        tags$span(labels[2], style = "float: right;")
      )
    )
  } else  {
    tag_legend <- tags$div(
      style = "width: 100%;",
      tags$div(
        class = "topogram-legend-gradient",
        style = css(
          height = height,
          width = "12px",
          float = "left",
          background = linear_gradient(colors, direction = "v")
        )
      ),
      tags$div(
        style = paste("height: ", height, ";"),
        class = "topogram-legend-labels-v",
        tags$div(labels[1]),
        tags$div(labels[2], class = "topogram-legend-labels-v-2")
      )
    )
  }
  doRenderTags(tagList(
    if (!is.null(title)) {
      tags$div(
        title,
        class = "topogram-legend-title"
      )
    },
    tags$div(
      class = "topogram-legend-colors",
      tag_legend
    )
  ))
}

