
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


#' @importFrom scales col_numeric
#' @importFrom rlang is_function is_character
getColors <- function(palette, values) {
  values_range <- range(values, na.rm = TRUE)
  if (is_character(palette)) {
    col_fun <- scales::col_numeric(
      palette = palette,
      domain = values_range
    )
    topogram_color <- col_fun(values)
    colors <- col_fun(seq(from = values_range[1], to = values_range[2], length.out = 20))
  } else if (is_function(palette)) {
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
#' @importFrom glue glue_data
getLabels <- function(sfobj, label, values) {
  label <- doRenderTags(tags$div(
    style = "margin-top:-25px;",
    label
  ))
  glue::glue_data(sfobj, label, value = values)
}


#' @importFrom rlang is_character is_list is_named is_null %||%
get_topogram_options <- function(x, palette = "viridis", label = "{value]") {
  if (is_character(x)) {
    lapply(
      X = x,
      FUN = function(value) {
        list(value = value, palette = palette, label = label)
      }
    )
  } else if (is_list(x) && is_named(x)) {
    if (!is_character(x[[1]], n = 1)) {
      stop(
        "topogram_select: if 'values' is a list, items must be character of length 1.",
        call. = FALSE
      )
    }
    lapply(
      X = unname(x),
      FUN = function(value) {
        list(value = value, palette= palette, label = label)
      }
    )
  } else if (is_list(x) && is_list(x[[1]])) {
    if (!is_named(x[[1]])) {
      stop(
        "topogram_select: 'values' must be either a character vector, or a named list, or a list of lists",
        call. = FALSE
      )
    }
    if (is_null(x[[1]]$value)) {
      stop(
        "topogram_select: if 'values' is a list of lists, it must have a `value` field",
        call. = FALSE
      )
    }
    lapply(
      X = x,
      FUN = function(.list) {
        .list$palette <- .list$palette %||% palette
        .list$label <- .list$label %||% label
        return(.list)
      }
    )
  } else {
    stop(
      "topogram_select: 'values' must be either a character vector, or a named list, or a list of lists",
      call. = FALSE
    )
  }
}

get_select_options <- function(x) {
  if (is_character(x)) {
    lapply(
      X = x,
      FUN = function(value) {
        list(value = value, text = value)
      }
    )
  } else if (is_list(x) && is_named(x)) {
    if (!is_character(x[[1]], n = 1)) {
      stop(
        "topogram_select: if 'values' is a list, items mustbe character of length 1.",
        call. = FALSE
      )
    }
    lapply(
      X = seq_along(x),
      FUN = function(i) {
        list(value = x[[i]], text = names(x)[i])
      }
    )
  } else if (is_list(x) && is_list(x[[1]])) {
    if (!is_named(x[[1]])) {
      stop(
        "topogram_select: 'values' must be either a character vector, or a named list, or a list of lists",
        call. = FALSE
      )
    }
    if (is_null(x[[1]]$value)) {
      stop(
        "topogram_select: if 'values' is a list of lists, it must have a `value` field",
        call. = FALSE
      )
    }
    lapply(
      X = x,
      FUN = function(l) {
        list(value = l$value, text = l$text %||% l$value)
      }
    )
  } else {
    stop(
      "topogram_select: 'values' must be either a character vector, or a named list, or a list of lists",
      call. = FALSE
    )
  }
}

