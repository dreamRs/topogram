
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
europe <- st_crop(europe, xmin = -20, ymin = 25, xmax = 35, ymax = 75)





# Prepare data ------------------------------------------------------------

# Merge data
europe <- europe %>%
  select(NUTS_NAME, id) %>%
  inner_join(
    y = eu_wine %>% filter(
      prod_bal == "P.D.O. - Red and rose wine",
      bal_item == "Gross human consumption (1000 hl)",
      format(time, "%Y") == "2013"
    ) %>%
      mutate(values = if_else(values == 0, 1, values)) %>%
      select(geo_code, name = geo, red_wine = values),
    by = c("id" = "geo_code")
  ) %>%
  inner_join(
    y = eu_wine %>% filter(
      prod_bal == "P.D.O. -  white wine",
      bal_item == "Gross human consumption (1000 hl)",
      format(time, "%Y") == "2013"
    ) %>%
      mutate(values = if_else(values == 0, 1, values)) %>%
      select(geo_code, white_wine = values),
    by = c("id" = "geo_code")
  ) %>%
  inner_join(
    y = eu_wine %>% filter(
      prod_bal == "Red and rose wine",
      bal_item == "Gross human consumption per capita (lt/head)",
      format(time, "%Y") == "2013"
    ) %>%
      mutate(values = if_else(values == 0, 1, values)) %>%
      select(geo_code, red_wine_per_capita = values),
    by = c("id" = "geo_code")
  ) %>%
  inner_join(
    y = eu_wine %>% filter(
      prod_bal == "White wine",
      bal_item == "Gross human consumption per capita (lt/head)",
      format(time, "%Y") == "2013"
    ) %>%
      mutate(values = if_else(values == 0, 1, values)) %>%
      select(geo_code, white_wine_per_capita = values),
    by = c("id" = "geo_code")
  )


# europe$total_prod[europe$total_prod == 0] <- 10



# App shiny ---------------------------------------------------------------

library(shiny)

liste_vars <- list(
  "Total vin rouge (en milliers d'hectolitres)" = "red_wine",
  "Total vin blanc (en milliers d'hectolitres)" = "white_wine",
  "Vin rouge par habitant (litre/hab)" = "red_wine_per_capita",
  "Vin blanc par habitant (litre/hab)" = "white_wine_per_capita"
)

ui <- fluidPage(
  fluidRow(
    column(
      width = 10, offset = 1,
      tags$h2("Exemple de cartogramme"),
      fluidRow(
        column(
          width = 3,
          tags$br(),
          radioButtons(
            inputId = "var",
            label = "Variable :",
            choices = liste_vars,
            selected = "red_wine"
          ),
          sliderInput(
            inputId = "n_iteration",
            label = "Nombre d'it\u00e9rations",
            min = 1, max = 60, value = 20
          )
        ),
        column(
          width = 9,
          topogramOutput(outputId = "carte", height = "650px")
        )
      )
    )
  )
)

server <- function(input, output, session) {

  # Initialisation de la carte
  output$carte <- renderTopogram({
    topogram(
      shape = europe,
      value = "red_wine",
      n_iteration = 20,
      format_value = ",",
      d3_locale = "fr-FR"
    ) %>% add_legend(
      title = "Total vin rouge (en milliers d'hectolitres)",
      title_width = 200,
      orientation = "vertical",
      label_format = ",.2r" #.2s
    ) %>% add_labs(
      title = "Consommation de vin en Europe",
      subtitle = "en 2013",
      caption = "Source : Eurostat"
    )
  })

  # Maj de la carte
  observeEvent(list(input$var, input$n_iteration), {
    topogramProxy(shinyId = "carte") %>%
      proxy_update_iteration(n_iteration = input$n_iteration) %>%
      proxy_update_value(
        new_value = input$var,
        legend_title = names(liste_vars)[unlist(liste_vars, use.names = FALSE) == input$var]
      )
  })

}

shinyApp(ui, server)
