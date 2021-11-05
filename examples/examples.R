

# Packages ----------------------------------------------------------------

library(topogram)
library(sf)
library(rnaturalearth)



# Data --------------------------------------------------------------------

data("world", package = "topogram")


# Default -----------------------------------------------------------------

topogram(world, value = "pop_est")
topogram(world, value = "pop_est", n_iteration = 50)



# Tooltip -----------------------------------------------------------------

topogram(world, value = "pop_est", label = "{name}: {format(pop_est, big.mark = ',')}")

library(htmltools)
topogram(
  sfobj = world, 
  value = "pop_est", 
  label = tagList(tags$b("{name}:"), tags$br(), "{format(pop_est, big.mark = ',')}")
)



# Colors ------------------------------------------------------------------

topogram(shape = world, value = "pop_est", palette = "Blues")

library(scales)
topogram(
  sfobj = world, 
  value = "pop_est", 
  palette = col_quantile("Blues", domain = NULL)
)
topogram(
  sfobj = world, 
  value = "pop_est", 
  palette = col_bin("Blues", domain = NULL)
)



# Projections -------------------------------------------------------------

topogram(world, value = "pop_est", n_iteration = 1)
topogram(world, value = "pop_est", n_iteration = 1, projection = "geoEqualEarth")
topogram(world, value = "pop_est", n_iteration = 1, projection = "geoEckert1")
topogram(world, value = "pop_est", n_iteration = 1, projection = "geoKavrayskiy7")

