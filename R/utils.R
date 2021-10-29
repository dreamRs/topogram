
# Select menu utils

# create choices for select menu
#' @importFrom htmltools htmlEscape HTML
selectOptions <- function(choices, selected = NULL) {
  html <- mapply(choices, names(choices), FUN = function(choice,
                                                         label) {
    if (is.list(choice)) {
      sprintf("<optgroup label=\"%s\">\n%s\n</optgroup>",
              htmlEscape(label, TRUE), selectOptions(choice,
                                                     selected))
    }
    else {
      sprintf("<option value=\"%s\"%s>%s</option>", htmlEscape(choice,
                                                               TRUE), if (choice %in% selected)
                                                                 " selected"
              else "", htmlEscape(label))
    }
  })
  HTML(paste(html, collapse = "\n"))
}


choicesWithNames <- function(choices) {
  listify <- function(obj) {
    makeNamed <- function(x) {
      if (is.null(names(x)))
        names(x) <- character(length(x))
      x
    }
    res <- lapply(obj, function(val) {
      if (is.list(val))
        listify(val)
      else if (length(val) == 1 && is.null(names(val)))
        as.character(val)
      else makeNamed(as.list(val))
    })
    makeNamed(res)
  }
  choices <- listify(choices)
  if (length(choices) == 0)
    return(choices)
  choices <- mapply(choices, names(choices), FUN = function(choice,
                                                            name) {
    if (!is.list(choice))
      return(choice)
    if (name == "")
      stop("All sub-lists in \"choices\" must be named.")
    choicesWithNames(choice)
  }, SIMPLIFY = FALSE)
  missing <- names(choices) == ""
  names(choices)[missing] <- as.character(choices)[missing]
  choices
}


dropNulls <- function(x) {
  x[!vapply(x, is.null, FUN.VALUE = logical(1))]
}



# Check params for topogram

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



check_locale <- function(x) {
  json <- list.files(system.file("locales", package = "topogram"))
  njson <- gsub("\\.json", "", json)
  if (!x %in% njson) {
    stop(paste(
      "Invalid D3 locale, must be one of:",
      paste(njson, collapse = ", ")
    ), call. = FALSE)
  }
}

