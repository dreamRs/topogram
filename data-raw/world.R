
#  ------------------------------------------------------------------------
#
# Title : World polygons + some data
#  Date : 2021-11-05
#
#  ------------------------------------------------------------------------


# Packages ----------------------------------------------------------------

library(data.table)
library(sf)
library(rnaturalearth)
library(janitor)



# Polygons ----------------------------------------------------------------

wrld <- st_as_sf(countries110)
# doesn't support missing values !
wrld <- wrld[!is.na(wrld$pop_est), c("name", "iso_a3", "pop_est", "gdp_md_est")]
# Antarctica is not a whole polygon
wrld <- wrld[wrld$name != "Antarctica", ]



# Data --------------------------------------------------------------------

# CO2
# Source: https://ourworldindata.org/grapher/annual-co2-emissions-per-country?time=2018
co2 <- fread(file = "data-raw/annual-co2-emissions-per-country.csv")
setnames(co2, make_clean_names)
setnames(co2, 1:2, c("country", "iso_a3"))
co2[, annual_co2_emissions := as.numeric(annual_co2_emissions)]
co2 <- dcast(
  data = co2,
  subset = .((year == 1990 | year == 2020) & iso_a3 != ""),
  formula = iso_a3 ~ year, 
  value.var = "annual_co2_emissions"
)
setnames(co2, 2:3, function(x) paste0("co2_emissions_", x))
setnafill(co2, fill = 0, cols = 2:3)
wrld <- merge(x = wrld, y = co2, by = "iso_a3", all.x = TRUE, all.y = FALSE)


# Share of electricity production from renewables
# Source: https://ourworldindata.org/grapher/share-electricity-renewables?time=latest
renewables <- fread(file = "data-raw/share-electricity-renewables.csv")
setnames(renewables, make_clean_names)
setnames(renewables, 1:2, c("country", "iso_a3"))
# renewables[, renewables_percent_electricity := round(renewables_percent_electricity, 1)]
renewables[renewables_percent_electricity > 100, renewables_percent_electricity := 100]
renewables[renewables_percent_electricity < 0, renewables_percent_electricity := 0]
wrld <- merge(x = wrld, y = renewables[year == 2019, list(iso_a3, renewables_percent_electricity)], by = "iso_a3", all.x = TRUE, all.y = FALSE)


colSums(is.na(wrld))
# wrld <- wrld[!is.na(wrld$renewables_percent_electricity), ]
# wrld <- wrld[!is.na(wrld$co2_emissions_2020), ]
wrld$renewables_percent_electricity[is.na(wrld$renewables_percent_electricity)] <- 0
wrld$co2_emissions_2020[is.na(wrld$co2_emissions_2020)] <- 0

# Use ---------------------------------------------------------------------

world <- wrld
usethis::use_data(world, overwrite = TRUE)
