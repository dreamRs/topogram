#  ------------------------------------------------------------------------
#
# Title : Projection
#    By : Victor
#  Date : 2018-10-01
#
#  ------------------------------------------------------------------------



# Packages ----------------------------------------------------------------

library( topogRam )
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

topogRam(
  shape = wrld,
  value = "pop_est",
  n_iteration = 1 # no distortion
)



# Albers ------------------------------------------------------------------

topogRam(
  shape = wrld,
  value = "pop_est",
  n_iteration = 1 # no distortion
  , projection = "Albers"
)



# Natural Earth -----------------------------------------------------------

topogRam(
  shape = wrld,
  value = "pop_est",
  n_iteration = 1 # no distortion
  , projection = "NaturalEarth1"
)


# ConicEqualArea ----------------------------------------------------------

topogRam(
  shape = wrld,
  value = "pop_est",
  n_iteration = 1 # no distortion
  , projection = "ConicEqualArea"
)



# Eckert IV ---------------------------------------------------------------

topogRam(
  shape = wrld,
  value = "pop_est",
  n_iteration = 1 # no distortion
  , projection = "Eckert4"
)
