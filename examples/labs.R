library(topogram)
library(htmltools)

topogram(world, "pop_est") %>% 
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
