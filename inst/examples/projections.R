#  ------------------------------------------------------------------------
#
# Title : Projection
#    By : Victor
#  Date : 2018-10-01
#
#  ------------------------------------------------------------------------



# Packages ----------------------------------------------------------------

library( topogram )
library( rnaturalearth )
library( dplyr )
library( sf )
library( rmapshaper )




# Data --------------------------------------------------------------------

wrld <- st_as_sf(countries110)
# Remove missing values
wrld <- wrld[!is.na(wrld$pop_est), c("name", "pop_est", "gdp_md_est")]
# Antarctica is not a whole polygon
wrld <- wrld[wrld$name != "Antarctica", ]
plot(st_geometry(wrld))
wrld



# Mercator ----------------------------------------------------------------

topogram(
  shape = wrld,
  value = "pop_est",
  n_iteration = 1 # no distortion
)



# Albers ------------------------------------------------------------------

topogram(
  shape = wrld,
  value = "pop_est",
  n_iteration = 1 # no distortion
  , projection = "Albers"
)



# Natural Earth -----------------------------------------------------------

topogram(
  shape = wrld,
  value = "pop_est",
  n_iteration = 1 # no distortion
  , projection = "NaturalEarth1"
)


# ConicEqualArea ----------------------------------------------------------

topogram(
  shape = wrld,
  value = "pop_est",
  n_iteration = 1 # no distortion
  , projection = "ConicEqualArea"
)



# Eckert IV ---------------------------------------------------------------

topogram(
  shape = wrld,
  value = "pop_est",
  n_iteration = 1 # no distortion
  , projection = "Eckert4"
)
