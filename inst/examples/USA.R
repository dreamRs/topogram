



# USA topogRam ------------------------------------------------------------

library("topogRam")
library("RColorBrewer")


# Exemple from here :
# http://prag.ma/code/d3-cartogram/#popest/2010

data(nst_2011)
head(nst_2011)

# one var example
topogRam(
  data = nst_2011,
  key_var = "CENSUS2010POP",
  shape = "usa-states",
  geo_lab = "NAME",
  col = rev(brewer.pal("RdYlBu", n = 3)),
  width = 800, height = 500
)


# All vars for 2011

year <- 2011

key_var <- list(
  list(name = "Population Estimate", key = "POPESTIMATE%d"),
  list(name = "Population Change", key = "NPOPCHG_%d"),
  list(name = "Births", key = "BIRTHS%d"),
  list(name = "Deaths", key = "DEATHS%d"),
  list(name = "Natural Increase", key = "NATURALINC%d"),
  list(name = "Int'l Migration", key = "INTERNATIONALMIG%d"),
  list(name = "Domestic Migration", key = "DOMESTICMIG%d"),
  list(name = "Net Migration", key = "NETMIG%d"),
  list(name = "Residual", key = "RESIDUAL%d"),
  list(name = "Birth Rate", key = "RBIRTH%d"),
  list(name = "Death Rate", key = "RDEATH%d"),
  list(name = "Natural Increase Rate", key = "RNATURALINC%d"),
  list(name = "Int'l Migration Rate", key = "RINTERNATIONALMIG%d"),
  list(name = "Net Domestic Migration Rate", key = "RDOMESTICMIG%d"),
  list(name = "Net Migration Rate", key = "RNETMIG%d")
)

key_var <- lapply(
  X = key_var,
  FUN = function(x) {
    x$key <- sprintf(x$key, year)
    x$lab <- ""
    x
  }
)

topogRam(
  data = nst_2011,
  key_var = key_var,
  shape = "usa-states",
  geo_lab = "NAME",
  col = rev(brewer.pal("RdYlBu", n = 3)),
  width = 800, height = 500
)


