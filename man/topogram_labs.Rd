% Generated by roxygen2: do not edit by hand
% Please edit documentation in R/topo-extras.R
\name{topogram_labs}
\alias{topogram_labs}
\title{Labs for topogram widget}
\usage{
topogram_labs(topo, title = NULL, subtitle = NULL, caption = NULL)
}
\arguments{
\item{topo}{A \code{\link[=topogram]{topogram()}} \code{htmlwidget} object.}

\item{title}{Main title.}

\item{subtitle}{Subtitle.}

\item{caption}{Brief explanation of the source of the data.}
}
\value{
A \code{\link[=topogram]{topogram()}} / \code{\link[=topogram_proxy]{topogram_proxy()}} \code{htmlwidget} object.
}
\description{
Add title, subtitle and caption to a topogram.
}
\examples{
library(topogram)
library(htmltools)

topogram(world, "pop_est") \%>\% 
  topogram_labs(
    title = "World population",
    subtitle = "Population estimate for 2017",
    caption = tagList(
      "Data source:",
      tags$a(
        href = "https://www.naturalearthdata.com/",
        "NaturalEarth"
      )
    )
  )
}
