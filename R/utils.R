
dropNulls <- function(x) {
  x[!vapply(x, is.null, FUN.VALUE = logical(1))]
}

check_sf <- function(obj) {
  if (!inherits(obj, "sf")) {
    stop("'shape' must be an `sf` object.", call. = FALSE)
  }
}

check_topogram <- function(topo) {
  if (!inherits(topo, c("topogram", "topogram_Proxy"))) {
    stop("topo must be a topogram() object.", call. = FALSE)
  }
}

check_variables <- function(data, vars) {
  vars <- unlist(vars, use.names = FALSE, recursive = TRUE)
  if (!all(vars %in% names(data))) {
    stop("'value' must be valid variable(s) name(s).", call. = FALSE)
  }
}

check_na <- function(data, vars) {
  vars <- unlist(vars, use.names = FALSE, recursive = TRUE)
  if (anyNA(data[, vars])) {
    stop("topogram does not support missing values.", call. = FALSE)
  }
}


# gradient
linear_gradient <- function(cols, direction = c("h", "v")) {
  direction <- match.arg(direction)
  x <- round(seq(from = 0, to = 100, length.out = length(cols)+1))
  ind <- c(1, rep(seq_along(x)[-c(1, length(x))], each = 2), length(x))
  m <- matrix(data = paste0(x[ind], "%"), ncol = 2, byrow = TRUE)
  res <- lapply(
    X = seq_len(nrow(m)),
    FUN = function(i) {
      paste(paste(cols[i], m[i, 1]), paste(cols[i], m[i, 2]), sep = ", ")
    }
  )
  res <- unlist(res)
  res <- paste(res, collapse = ", ")
  if (direction == "h") {
    paste0("linear-gradient(to right, ", res, ");")
  } else {
    paste0("linear-gradient(to bottom, ", res, ");")
  }
}


getColors <- function(palette, values) {
  values_range <- range(values, na.rm = TRUE)
  if (is.character(palette)) {
    col_fun <- scales::col_numeric(
      palette = palette,
      domain = values_range
    )
    topogram_color <- col_fun(values)
    colors <- col_fun(seq(from = values_range[1], to = values_range[2], length.out = 20))
  } else if (is.function(palette)) {
    topogram_color <- palette(values)
    colors <- palette(seq(from = values_range[1], to = values_range[2], length.out = 20))
  } else {
    stop(
      "'palette' must be a character (palette name) or a function (like ?scales::col_numeric)", 
      call. = FALSE
    )
  }
  list(values = topogram_color, legend = colors)
}

#' @importFrom htmltools doRenderTags tags
getLabels <- function(sfobj, label, values) {
  label <- doRenderTags(tags$div(
    style = "margin-top:-25px;",
    label
  ))
  glue::glue_data(sfobj, label, value = values)
}
