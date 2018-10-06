
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

# map data
fr_dept <- ne_states(country = "france", returnclass = "sf")
fr_dept <- fr_dept[fr_dept$type_en %in% "Metropolitan department", ]


fr_dept$foo <- floor(runif(96, min = 1000, max = 1000000))



# App ---------------------------------------------------------------------


library(shiny)

ui <- fluidPage(
  fluidRow(
    column(
      width = 10, offset = 1,
      tags$h2("topogram : update value with proxy"),
      actionButton(inputId = "update", label = "Update random data"),
      topogramOutput(outputId = "carto", height = "600px")
    )
  )
)

server <- function(input, output, session) {

  # Initialize
  output$carto <- renderTopogRam({
    topogram(
      shape = fr_dept,
      value = "foo",
      tooltip_label = ~name,
      n_iteration = 1
    )
  })

  # Update
  observeEvent(input$update, {
    topogramProxy(shinyId = "carto") %>%
      proxy_update_iteration(n_iteration = 10) %>%
      proxy_update_value(new_value = floor(runif(96, min = 1000, max = 1000000)))
  }, ignoreInit = TRUE)

}

shinyApp(ui, server)
