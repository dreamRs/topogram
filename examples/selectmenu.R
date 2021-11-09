library(topogram)
library(htmltools)

# normally, you would use the following in RMarkdown

browsable(tagList(
  # Select menu
  topogram_select(
    topogramId = "ID",
    sfobj = world,
    values = list(
      "Population" = "pop_est",
      "GDP" = "gdp_md_est", 
      "CO2 emissions (1990)" = "co2_emissions_1990", 
      "CO2 emissions (2020)" = "co2_emissions_2020", 
      "Share of electricity production from renewables" = "renewables_percent_electricity"
    ),
    label = "{name} : {value}"
  ),
  
  # Topogram
  topogram(
    sfobj = world,
    value = "pop_est", 
    label = "{name} : {value}",
    elementId = "ID"
  )
), value = interactive())


# specific options according to variables
browsable(tagList(
  # Select menu
  topogram_select(
    topogramId = "ID",
    sfobj = world,
    values = list(
      list(
        text = "Population", 
        value = "pop_est", 
        palette = "Greens", 
        label = "{name} : {value} inhabitants"
      ),
      list(
        text = "GDP",
        value = "gdp_md_est", 
        palette = "Blues", 
        label = "{name} : ${value}"
      )
    ),
    label = "{name} : {value}"
  ),
  
  # Topogram
  topogram(
    sfobj = world,
    value = "pop_est", 
    elementId = "ID",
    # you have to specify parameters for initializing topogram
    palette = "Greens",
    label = "{name} : {value} inhabitants"
  )
), value = interactive())
