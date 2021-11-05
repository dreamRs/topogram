

# Packages ----------------------------------------------------------------

library(topogram)
library(sf)
library(rnaturalearth)



# Data --------------------------------------------------------------------

data("world", package = "topogram")


# Default -----------------------------------------------------------------

topogram(shape = world, value = "pop_est")
topogram(shape = world, value = "pop_est", n_iteration = 50)



# Tooltip -----------------------------------------------------------------

topogram(shape = world, value = "pop_est", label = "{name}: {format(pop_est, big.mark = ',')}")

library(htmltools)
topogram(
  shape = world, 
  value = "pop_est", 
  label = tagList(tags$b("{name}:"), tags$br(), "{format(pop_est, big.mark = ',')}")
)



# Colors ------------------------------------------------------------------

topogram(shape = world, value = "pop_est", palette = "Blues")

library(scales)
topogram(
  shape = world, 
  value = "pop_est", 
  palette = col_quantile("Blues", domain = NULL)
)
topogram(
  shape = world, 
  value = "pop_est", 
  palette = col_bin("Blues", domain = NULL)
)



# Projections -------------------------------------------------------------

topogram(shape = world, value = "pop_est", n_iteration = 1)
topogram(shape = world, value = "pop_est", n_iteration = 1, projection = "geoEqualEarth")
topogram(shape = world, value = "pop_est", n_iteration = 1, projection = "geoEckert1")
topogram(shape = world, value = "pop_est", n_iteration = 1, projection = "geoKavrayskiy7")

