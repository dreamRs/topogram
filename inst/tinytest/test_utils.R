library(topogram)
library(tinytest)

expect_inherits(topogram:::linear_gradient(letters, direction = "h"), "character")
expect_inherits(topogram:::linear_gradient(letters, direction = "v"), "character")

col1 <- topogram:::getColors("Blues", rnorm(30))
expect_inherits(col1, "list")
expect_inherits(col1$values, "character")
expect_inherits(col1$legend, "character")
expect_identical(length(col1$values), 30L)

col2 <- topogram:::getColors(scales::col_numeric(palette = "Blues", domain = NULL), rnorm(40))
expect_inherits(col2, "list")
expect_inherits(col2$values, "character")
expect_inherits(col2$legend, "character")
expect_identical(length(col2$values), 40L)

expect_error(topogram:::getColors(list(), rnorm(40)))


expect_inherits(topogram:::getLabels(world, "{name}"), "character")



opt1 <- c( "pop_est", "gdp_md_est", "co2_emissions_1990", 
           "co2_emissions_2020", "renewables_percent_electricity")
opt2 <- list(
  "Population" = "pop_est",
  "GDP" = "gdp_md_est", 
  "CO2 emissions (1990)" = "co2_emissions_1990", 
  "CO2 emissions (2020)" = "co2_emissions_2020", 
  "Share of electricity production from renewables" = "renewables_percent_electricity"
)
opt3 <- list(
  list(text = "Population", value = "pop_est", palette = "viridis"),
  list(text = "GDP", value = "gdp_md_est", palette = "Blues", title = "AAA")
)


expect_inherits(topogram:::get_topogram_options(opt1), "list")
expect_inherits(topogram:::get_topogram_options(opt2), "list")
expect_inherits(topogram:::get_topogram_options(opt3), "list")

expect_error(topogram:::get_topogram_options(iris))
expect_error(topogram:::get_topogram_options(list(list(1))))
expect_error(topogram:::get_topogram_options(1))


expect_inherits(topogram:::get_select_options(opt1), "list")
expect_inherits(topogram:::get_select_options(opt2), "list")
expect_inherits(topogram:::get_select_options(opt3), "list")

expect_error(topogram:::get_select_options(iris))
expect_error(topogram:::get_select_options(list(list(1))))
expect_error(topogram:::get_select_options(1))
