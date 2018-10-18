
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

# Paris population data
data("paris")




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
  output$carto <- renderTopogram({
    topogram(
      shape = paris,
      value = "AGE_00",
      tooltip_label = ~paste0(LIB, " (", NAME, ")"),
      n_iteration = 1
    ) %>%
      add_legend(title = "FOOOO", label_format = ".2s")
  })

  # Update
  observeEvent(input$update, {
    topogramProxy(shinyId = "carto") %>%
      proxy_update_value(new_value = floor(runif(20, min = 1000, max = 1000000)))
  }, ignoreInit = TRUE)

}

shinyApp(ui, server)
