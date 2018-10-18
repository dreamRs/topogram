
#  ------------------------------------------------------------------------
#
# Title : topogram - proxy : update value
#    By : Victor
#  Date : 2018-10-01
#
#  ------------------------------------------------------------------------




# Packages ----------------------------------------------------------------

library( shiny )
library( rnaturalearth )
library( topogram )
library( dplyr )




# Data --------------------------------------------------------------------

# population data
data("pop_france")


# map data
fr_dept <- ne_states(country = "france", returnclass = "sf")
fr_dept <- fr_dept[fr_dept$type_en %in% "Metropolitan department", ]



# join data
fr_data <- left_join(
  x = fr_dept %>% select(name, iso_3166_2) %>% mutate(code_dep = gsub("FR-", "", iso_3166_2)),
  y = pop_france,
  by = c("code_dep" = "departements_code")
)





# App ---------------------------------------------------------------------


library(shiny)

ui <- fluidPage(
  fluidRow(
    column(
      width = 10, offset = 1,
      tags$h2("topogram : update value with proxy"),
      radioButtons(
        inputId = "new_value",
        label = "Variable to use:",
        choices = grep(pattern = "femmes", x = names(fr_data), value = TRUE),
        inline = TRUE
      ),
      topogramOutput(outputId = "carto", height = "600px")
    )
  )
)

server <- function(input, output, session) {

  # Initialize
  output$carto <- renderTopogram({
    topogram(
      shape = fr_data,
      value = "femmes_0_a_19_ans",
      tooltip_label = ~name,
      n_iteration = 10,
      format_value = ",",
      d3_locale = "fr-FR"
    ) %>% add_legend(
      title = "Population",
      title_width = 200,
      orientation = "vertical",
      label_format = ",.2r" #.2s
    )
  })

  # Update
  observeEvent(input$new_value, {
    topogramProxy(shinyId = "carto") %>%
      proxy_update_value(new_value = input$new_value, legend_title = gsub("_", " ", input$new_value))
  }, ignoreInit = TRUE)

}

shinyApp(ui, server)
