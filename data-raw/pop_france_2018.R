
#  ------------------------------------------------------------------------
#
# Title : Structure population France
#    By : Victor
#  Date : 2018-10-01
#
#  ------------------------------------------------------------------------



# Packages ----------------------------------------------------------------

library( data.table )
library( readxl )
library( janitor )
library( zoo )



# Population data ---------------------------------------------------------

# https://www.insee.fr/fr/statistiques/1893198
tmp <- tempdir()
download.file(
  url = "https://www.insee.fr/fr/statistiques/fichier/1893198/estim-pop-dep-sexe-gca-1975-2018.xls",
  destfile = file.path(tmp, "estim-pop-dep-sexe-gca-1975-2018.xls"), mode = "wb"
)

# Column's names
col_names <- read_excel(path = file.path(tmp, "estim-pop-dep-sexe-gca-1975-2018.xls"), sheet = "2018", skip = 3, n_max = 2, col_names = FALSE)
na.fill(col_names[1])

new_col_names <- paste(
  na.locf(unlist(col_names[1, ], use.names = FALSE)),
  c("code", "lib", na.omit(unlist(col_names[2, ], use.names = FALSE))),
  sep = "_"
)

# Data
pop_france <- read_excel(path = file.path(tmp, "estim-pop-dep-sexe-gca-1975-2018.xls"), sheet = "2018", skip = 5, col_names = FALSE)
setDT(pop_france)
setnames(pop_france, names(pop_france), new_col_names)
pop_france <- clean_names(pop_france)
pop_france

pop_france <- pop_france[!is.na(departements_code) & !is.na(departements_lib)]
pop_france


pop_france[, departements_code := stringi::stri_trans_general(str = departements_code, id = "ASCII-Latin")]
pop_france[, departements_lib := stringi::stri_trans_general(str = departements_lib, id = "ASCII-Latin")]
pop_france



# Use data ----------------------------------------------------------------

setDF(pop_france)
usethis::use_data(pop_france, overwrite = TRUE)

