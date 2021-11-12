
#  ------------------------------------------------------------------------
#
# Title :France departments + employment data
#  Date : 2021-11-05
#
#  ------------------------------------------------------------------------


# Packages ----------------------------------------------------------------

library(data.table)
library(sf)
library(rnaturalearth)
library(rnaturalearthhires)
library(janitor)
library(readxl)



# Polygons ----------------------------------------------------------------

france <- ne_states(country = "france", returnclass = "sf")
france <- france[france$type_en %in% "Metropolitan department", ]
france <- france[, c("name", "iso_3166_2")]



# Data --------------------------------------------------------------------

# Structure de l'emploi total par grand secteur d'activité en 2019
# Source: https://www.insee.fr/fr/statistiques/2012798

emploi <- read_excel(path = "data-raw/TCRD_027.xlsx", skip = 3)
names(emploi)[1] <- c("iso_3166_2")
emploi[[2]] <- NULL
emploi$iso_3166_2 <- paste0("FR-", emploi$iso_3166_2)

france <- merge(x = france, y = emploi, by = "iso_3166_2", all.x = TRUE, all.y = FALSE)


# Use ---------------------------------------------------------------------

usethis::use_data(france, overwrite = TRUE)


