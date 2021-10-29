
dropNulls <- function(x) {
  x[!vapply(x, is.null, FUN.VALUE = logical(1))]
}

check_sf <- function(obj) {
  if (!"sf" %in% class(obj)) {
    stop("'shape' must be an `sf` object.", call. = FALSE)
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

