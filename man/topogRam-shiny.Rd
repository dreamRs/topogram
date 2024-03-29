% Generated by roxygen2: do not edit by hand
% Please edit documentation in R/shiny.R
\name{topogram-shiny}
\alias{topogram-shiny}
\alias{topogramOutput}
\alias{renderTopogram}
\alias{topogram_proxy}
\title{Shiny bindings for topogram}
\usage{
topogramOutput(outputId, width = "100\%", height = "400px")

renderTopogram(expr, env = parent.frame(), quoted = FALSE)

topogram_proxy(shinyId, session = shiny::getDefaultReactiveDomain())
}
\arguments{
\item{outputId}{output variable to read from}

\item{width, height}{Must be a valid CSS unit (like \code{'100\%'},
\code{'400px'}, \code{'auto'}) or a number, which will be coerced to a
string and have \code{'px'} appended.}

\item{expr}{An expression that generates a topogram}

\item{env}{The environment in which to evaluate \code{expr}.}

\item{quoted}{Is \code{expr} a quoted expression (with \code{quote()})? This
is useful if you want to save an expression in a variable.}

\item{shinyId}{single-element character vector indicating the output ID of the
chart to modify (if invoked from a Shiny module, the namespace will be added
automatically)}

\item{session}{the Shiny session object to which the chart belongs; usually the
default value will suffice}
}
\description{
Output and render functions for using topogram within Shiny
applications and interactive Rmd documents.
}
