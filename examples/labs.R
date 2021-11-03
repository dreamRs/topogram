library(topogram)
library(htmltools)
data(paris)

topogram(paris, "TOTAL") %>% 
  topogram_labs(
    title = "Paris",
    subtitle = "Population by district",
    caption = tagList(
      "Data source: INSEE &",
      tags$a(
        href = "opendata.paris.fr",
        "opendata.paris.fr"
      )
    )
  )
