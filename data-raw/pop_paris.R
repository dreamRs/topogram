
#  ------------------------------------------------------------------------
#
# Title : Paris population
#    By : Victor
#  Date : 2018-10-02
#
#  ------------------------------------------------------------------------



# Packages ----------------------------------------------------------------

library( data.table )
library( sf)
library( CARTElette )
library( dplyr )


# Population data ---------------------------------------------------------

# https://www.insee.fr/fr/statistiques/2863610?sommaire=2867849
tmp <- tempdir()
download.file(
  url = "https://www.insee.fr/fr/statistiques/fichier/2863610/BTT_TD_POP1A_2014.zip",
  destfile = file.path(tmp, "BTT_TD_POP1A_2014.zip")
)
path <- unzip(zipfile = file.path(tmp, "BTT_TD_POP1A_2014.zip"), exdir = tmp)

pop_communes <- fread(input = path, encoding = "UTF-8")
pop_communes

pop_paris <- pop_communes[substr(CODGEO, 1, 2) == "75"]
pop_paris[SEXE == 1, SEXE_LIB := "M"]
pop_paris[SEXE == 2, SEXE_LIB := "F"]
pop_paris[, NB := round(NB)]
pop_paris[, AGEPYR10 := paste0("AGE_", sprintf("%02d", AGEPYR10))]

pop_paris <- dcast(data = pop_paris, formula = CODGEO ~ AGEPYR10, value.var = "NB", fun.aggregate = sum)
pop_paris <- pop_paris[CODGEO != "75056"]

pop_paris <- pop_paris[, TOTAL := Reduce("+", .SD), .SDcols = names(pop_paris)[-1]]




# Polygons data -----------------------------------------------------------

# fond de carte
library(geojsonio)
# https://opendata.paris.fr/explore/dataset/arrondissements/
download.file(
  url = "https://opendata.paris.fr/explore/dataset/arrondissements/download/?format=geojson&timezone=Europe/Berlin",
  destfile = file.path(tmp, "paris.geojson")
)
parisgeo <- geojson_read(
  x = file.path(tmp, "paris.geojson"), what = "sp",
  stringsAsFactors = FALSE, encoding = "UTF-8", use_iconv = TRUE
)
parisgeo <- as(parisgeo, "sf")
parisgeo
plot(st_geometry(parisgeo))





# Merge -------------------------------------------------------------------

paris <- left_join(
  x = mutate(parisgeo, c_arinsee = as.character(c_arinsee)) %>%
    select(CODE_INSEE = c_arinsee, LIB = l_ar, NAME = l_aroff),
  y = pop_paris,
  by = c("CODE_INSEE" = "CODGEO")
) %>%
  arrange(CODE_INSEE) %>%
  mutate(
    LIB = stringi::stri_trans_general(str = LIB, id = "ASCII-Latin"),
    NAME = stringi::stri_trans_general(str = NAME, id = "ASCII-Latin")
  )
paris




# Use data ----------------------------------------------------------------

usethis::use_data(paris, overwrite = TRUE)




# Tests -------------------------------------------------------------------


library(topogram)


topogram(
  shape = paris,
  value = "AGE_00"
)







