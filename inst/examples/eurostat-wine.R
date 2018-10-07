
#  ------------------------------------------------------------------------
#
# Title : Wine consumption in Europe (via Eurostat)
#    By : Victor
#  Date : 2018-10-07
#
#  ------------------------------------------------------------------------




# Packages ----------------------------------------------------------------

library(topogram)
library(sf)
library(eurostat)
library(dplyr)
# library(rnaturalearth)




# Eurostat data -----------------------------------------------------------

eu_wine <- get_eurostat(id = "apro_cpb_wine", stringsAsFactors = FALSE)
eu_wine <- label_eurostat(eu_wine, code = "geo")
str(eu_wine)




# Geographical data -------------------------------------------------------

# europe <- ne_countries(scale = 50, continent = "europe", returnclass = "sf")
europe <- get_eurostat_geospatial(output_class = "sf", resolution = "10", nuts_level = 0, year = 2016)
europe <- st_crop(europe, xmin = -20, ymin = 30, xmax = 35, ymax = 75)





# Prepare data ------------------------------------------------------------

# Merge data
europe <- europe %>%
  select(NUTS_NAME, id) %>%
  inner_join(
    y = eu_wine %>% filter(
      prod_bal == "P.D.O. - Red and rose wine",
      bal_item == "Gross human consumption (1000 hl)",
      format(time, "%Y") == "2016"
    ) %>% select(geo_code, name = geo, red_wine = values),
    by = c("id" = "geo_code")
  ) %>%
  inner_join(
    y = eu_wine %>% filter(
      prod_bal == "P.D.O. -  white wine",
      bal_item == "Gross human consumption (1000 hl)",
      format(time, "%Y") == "2016"
    ) %>% select(geo_code, white_wine = values),
    by = c("id" = "geo_code")
  ) %>%
  inner_join(
    y = eu_wine %>% filter(
      prod_bal == "Red and rose wine",
      bal_item == "Gross human consumption per capita (lt/head)",
      format(time, "%Y") == "2015"
    ) %>% select(geo_code, red_wine_per_capita = values),
    by = c("id" = "geo_code")
  ) %>%
  inner_join(
    y = eu_wine %>% filter(
      prod_bal == "White wine",
      bal_item == "Gross human consumption per capita (lt/head)",
      format(time, "%Y") == "2015"
    ) %>% select(geo_code, white_wine_per_capita = values) %>%
      mutate(white_wine_per_capita = if_else(white_wine_per_capita == 0, 1, white_wine_per_capita)),
    by = c("id" = "geo_code")
  )


# europe$total_prod[europe$total_prod == 0] <- 10




# Cartograms --------------------------------------------------------------

topogram(
  shape = europe,
  value = "red_wine",
  n_iteration = 60,
  format_value = ",",
  d3_locale = "fr-FR"
)
topogram(shape = europe, value = c("red_wine", "white_wine"), n_iteration = 60)


topogram(
  shape = europe,
  value = list(
    "Total vin rouge" = "red_wine",
    "Total vin blanc" = "white_wine",
    "Vin rouge par habitant" = "red_wine_per_capita",
    "Vin blanc par habitant" = "white_wine_per_capita"
  ),
  n_iteration = 60,
  format_value = ",",
  d3_locale = "fr-FR"
) %>% add_legend(
  title = "",
  title_width = 200,
  orientation = "vertical",
  label_format = ",.2r" #.2s
) %>% add_labs(
  title = "Consommation de vin en Europe",
  caption = "Source Eurostat"
)


