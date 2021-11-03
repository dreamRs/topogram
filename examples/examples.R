

# Packages ----------------------------------------------------------------

library(topogram)
library(sf)
library(rnaturalearth)



# Data --------------------------------------------------------------------

wrld <- st_as_sf(countries110)
# doesn't support missing values !
wrld <- wrld[!is.na(wrld$pop_est), c("name", "pop_est", "gdp_md_est")]
# Antarctica is not a whole polygon
wrld <- wrld[wrld$name != "Antarctica", ]



# Default -----------------------------------------------------------------

topogram(shape = wrld, value = "pop_est")
topogram(shape = wrld, value = "pop_est", n_iteration = 50)



# Tooltip -----------------------------------------------------------------

topogram(shape = wrld, value = "pop_est", label = "{name}: {format(pop_est, big.mark = ',')}")

library(htmltools)
topogram(
  shape = wrld, 
  value = "pop_est", 
  label = tagList(tags$b("{name}:"), tags$br(), "{format(pop_est, big.mark = ',')}")
)



# Colors ------------------------------------------------------------------

topogram(shape = wrld, value = "pop_est", palette = "Blues")

library(scales)
topogram(
  shape = wrld, 
  value = "pop_est", 
  palette = col_quantile("Blues", domain = NULL)
)
topogram(
  shape = wrld, 
  value = "pop_est", 
  palette = col_bin("Blues", domain = NULL)
)



# Projections -------------------------------------------------------------

topogram(shape = wrld, value = "pop_est", n_iteration = 1)
topogram(shape = wrld, value = "pop_est", n_iteration = 1, projection = "geoEqualEarth")
topogram(shape = wrld, value = "pop_est", n_iteration = 1, projection = "geoEckert1")
topogram(shape = wrld, value = "pop_est", n_iteration = 1, projection = "geoKavrayskiy7")

