
#  ------------------------------------------------------------------------
#
# Title : New Zealand Retail sales by region (2012)
#    By : Victor
#  Date : 2018-10-01
#
#  ------------------------------------------------------------------------



# Packages ----------------------------------------------------------------

library(topogram)
library(rnaturalearth)
library(sf)
library(rmapshaper)





# Datas -------------------------------------------------------------------

# retail sales from : https://datafinder.stats.govt.nz/layer/95458-retail-trade-sales-per-capita-by-region-2012-2017/data/
# export shapefile with WGS 84 projection
nz_retail <- read_sf("dev/statsnzretail-trade-sales-per-capita-by-region-2012-2017-SHP/retail-trade-sales-per-capita-by-region-2012-2017.shp")
# nz_retail <- nz_retail[nz_retail$REGC2018_1 != "Area Outside Region", ]
nz_retail <- ms_simplify(nz_retail)
nz_retail



# Cartogram ---------------------------------------------------------------

topogram(
  shape = nz_retail,
  value = "Per_capita",
  tooltip_label = ~REGC2018_V,
  n_iteration = 20
)


topogram(
  shape = nz_retail,
  value = c("Per_capita", "Per_capi_1", "Per_capi_2", "Per_capi_3",
            "Per_capi_4", "Per_capi_5", "Total_trad", "Total_tr_1", "Total_tr_2",
            "Total_tr_3"),
  tooltip_label = ~REGC2018_V,
  n_iteration = 20
)


