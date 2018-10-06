
#  ------------------------------------------------------------------------
#
# Title : Cartogram for France
#    By : Victor
#  Date : 2018-10-01
#
#  ------------------------------------------------------------------------



# Packages ----------------------------------------------------------------

library( rnaturalearth )
library( topogram )
library( dplyr )



# Datas -------------------------------------------------------------------

# population data
data("pop_france")
glimpse(pop_france)


# map data
fr_dept <- ne_states(country = "france", returnclass = "sf")
fr_dept <- fr_dept[fr_dept$type_en %in% "Metropolitan department", ]



# join data
fr_data <- left_join(
  x = fr_dept %>% select(name, iso_3166_2) %>% mutate(code_dep = gsub("FR-", "", iso_3166_2)),
  y = pop_france,
  by = c("code_dep" = "departements_code")
)
fr_data




# Cartogram ---------------------------------------------------------------

# one var
topogram(
  shape = fr_data,
  value = "femmes_20_a_39_ans",
  tooltip_label = ~name,
  n_iteration = 10,
  format_value = ",",
  d3_locale = "fr-FR"
) %>% add_legend(
  title = "Femme 20-39 ans",
  title_width = 200,
  orientation = "vertical",
  label_format = ",.2r" #.2s
)


# all vars
topogram(
  shape = fr_data,
  value = names(fr_data)[5:22],
  tooltip_label = ~name,
  n_iteration = 10,
  select_label = NULL,
  format_value = ",",
  d3_locale = "fr-FR"
) %>% add_legend(
  title = "",
  title_width = 200,
  orientation = "vertical",
  label_format = ",.2r" #.2s
)

