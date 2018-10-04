

library(shiny)

ui <- fluidPage(
  fluidRow(
    column(
      width = 6,
      topogRamOutput(outputId = "carto1")
    ),
    column(
      width = 6,
      topogRamOutput(outputId = "carto2")
    )
  ),
  fluidRow(
    column(
      width = 6,
      topogRamOutput(outputId = "carto3")
    ),
    column(
      width = 6,
      topogRamOutput(outputId = "carto4")
    )
  )
)

server <- function(input, output, session) {

  output$carto1 <- renderTopogRam({
    topogRam(
      shape = fr_data,
      value = "femmes_20_a_39_ans",
      tooltip_label = ~name,
      n_iteration = 3,
      format_value = ",",
      d3_locale = "fr-FR"
    ) %>% add_labs(title = "Create interactive cartogram")
  })

  output$carto2 <- renderTopogRam({
    topogRam(
      shape = fr_data,
      value = "femmes_20_a_39_ans",
      tooltip_label = ~name,
      n_iteration = 3,
      format_value = ",",
      d3_locale = "fr-FR"
    ) %>% add_labs(title = "Add legend") %>%
      add_legend(title = "Femmes entre 20 et 39 ans", title_width = 200, orientation = "vertical", label_format = ",.2r")
  })

  output$carto3 <- renderTopogRam({
    topogRam(
      shape = fr_data,
      value = "femmes_20_a_39_ans",
      tooltip_label = ~name,
      n_iteration = 120,
      format_value = ",",
      d3_locale = "fr-FR"
    ) %>% add_labs(title = "Specify number of iteration to distort topology")
  })

  output$carto4 <- renderTopogRam({
    topogRam(
      shape = fr_data,
      value = "femmes_20_a_39_ans",
      tooltip_label = ~name,
      n_iteration = 1,
      format_value = ",",
      d3_locale = "fr-FR", projection = "Armadillo", palette = "YlOrBr"
    ) %>% add_labs(title = "Differents color scales & projection implemented")
  })

}

shinyApp(ui, server)
