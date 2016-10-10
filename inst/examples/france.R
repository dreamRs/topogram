


# France topogram ---------------------------------------------------------

library("topogRam")
library("RColorBrewer")


# All the data come from INSEE
# http://www.insee.fr/fr/themes/detail.asp?reg_id=99&ref_id=base-cc-evol-struct-pop-2013



# France regions ----------------------------------------------------------

# data
data(frRegPop)
head(frRegPop)

# one var
topogRam(
  data = frRegPop,
  key_var = "P13_POP",
  geo_lab = "region",
  colors = brewer.pal("Reds", n = 3)
)


# several vars
topogRam(
  data = frRegPop,
  key_var = c(
    "P13_POP", "C13_POP15P_CS1", "C13_POP15P_CS2", "C13_POP15P_CS3", "C13_POP15P_CS4",
    "C13_POP15P_CS5", "C13_POP15P_CS6", "C13_POP15P_CS7", "C13_POP15P_CS8"
  ),
  geo_lab = "region", colors = brewer.pal("Blues", n = 3)
)

# with some options
topogRam(
  data = frRegPop,
  key_var = list(
    list(key = "P13_POP", name = "Population en 2013", lab = "habitants"),
    list(key = "C13_POP15P_CS1", name = "Pop 15 ans ou plus Agriculteurs exploitants en 2013", lab = "agriculteurs"),
    list(key = "C13_POP15P_CS2", name = "Pop 15 ans ou plus Artisans, Comm., Chefs entr. en 2013", lab = "artisans"),
    list(key = "C13_POP15P_CS3", name = "Pop 15 ans ou plus Cadres, Prof. intel. sup. en 2013", lab = "cadres"),
    list(key = "C13_POP15P_CS4", name = "Pop 15 ans ou plus Prof. intermédiaires  en 2013", lab = "prof. intermédiaires"),
    list(key = "C13_POP15P_CS5", name = "Pop 15 ans ou plus Employés en 2013", lab = "employés"),
    list(key = "C13_POP15P_CS6", name = "Pop 15 ans ou plus Ouvriers en 2013", lab = "ouvriers"),
    list(key = "C13_POP15P_CS7", name = "Pop 15 ans ou plus Retraités  en 2013", lab = "retraités"),
    list(key = "C13_POP15P_CS8", name = "Pop 15 ans ou plus Autres en 2013", lab = "autres")
  ),
  geo_lab = "region", colors = brewer.pal("Blues", n = 7)
)





# France departements -----------------------------------------------------

# data
data(frDptPop)

# one var
topogRam(
  data = frDptPop,
  key_var = "P13_POP",
  shape = "france-dep",
  geo_lab = "departement",
  col = brewer.pal("Reds", n = 5)
)


# several vars
topogRam(
  data = frDptPop,
  key_var = c(
    "P13_POP", "C13_POP15P_CS1", "C13_POP15P_CS2", "C13_POP15P_CS3", "C13_POP15P_CS4",
    "C13_POP15P_CS5", "C13_POP15P_CS6", "C13_POP15P_CS7", "C13_POP15P_CS8"
  ),
  shape = "france-dep", geo_lab = "departement", colors = brewer.pal("Blues", n = 7)
)




# France regions 2016 -----------------------------------------------------

# data
data(frReg2016Pop)

# one var
topogRam(
  data = frReg2016Pop,
  key_var = "P13_POP",
  shape = "france-reg-2016",
  geo_lab = "region2016",
  col = brewer.pal("Reds", n = 5)
)

# several vars
topogRam(
  data = frReg2016Pop,
  key_var = c(
    "P13_POP", "C13_POP15P_CS1", "C13_POP15P_CS2", "C13_POP15P_CS3", "C13_POP15P_CS4",
    "C13_POP15P_CS5", "C13_POP15P_CS6", "C13_POP15P_CS7", "C13_POP15P_CS8"
  ),
  shape = "france-reg-2016", geo_lab = "region2016", colors = brewer.pal("Blues", n = 7)
)

# Manual size
topogRam(
  data = frReg2016Pop,
  key_var = "P13_POP",
  shape = "france-reg-2016",
  geo_lab = "region2016",
  col = brewer.pal("Reds", n = 5),
  width = 800, height = 800, origin = c(1.5, 49), scale = 4000
)


