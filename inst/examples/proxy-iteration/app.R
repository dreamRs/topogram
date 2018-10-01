
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
library( topogRam )
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
      tags$h2("topogRam : update value with proxy"),
      sliderInput(inputId = "n_iteration", label = "Number of iteration (more takes longer)", min = 1, max = 60, value = 20),
      topogRamOutput(outputId = "carto", height = "600px")
    )
  )
)

server <- function(input, output, session) {

  # Initialize
  output$carto <- renderTopogRam({
    topogRam(
      shape = fr_data,
      value = "femmes_0_a_19_ans",
      tooltip_label = ~name,
      n_iteration = 10
    )
  })

  # Update
  observeEvent(input$n_iteration, {
    topogramProxy(shinyId = "carto") %>%
      proxy_update_iteration(n_iteration = input$n_iteration)
  }, ignoreInit = TRUE)

}

shinyApp(ui, server)
