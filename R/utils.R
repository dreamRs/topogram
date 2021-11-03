
dropNulls <- function(x) {
  x[!vapply(x, is.null, FUN.VALUE = logical(1))]
}

check_sf <- function(obj) {
  if (!inherits(obj, "sf")) {
    stop("'shape' must be an `sf` object.", call. = FALSE)
  }
}

check_topogram <- function(topo) {
  if (!inherits(topo, "topogram")){
    stop("topo must be a topogram() object")
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
