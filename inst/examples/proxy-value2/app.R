
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

# map data
fr_dept <- ne_states(country = "france", returnclass = "sf")
fr_dept <- fr_dept[fr_dept$type_en %in% "Metropolitan department", ]

fr_dept$foo1 <- floor(runif(96, min = 1000, max = 1000000))
fr_dept$foo2 <- floor(runif(96, min = 1000, max = 1000000))
fr_dept$foo3 <- floor(runif(96, min = 1000, max = 1000000))
fr_dept$foo4 <- floor(runif(96, min = 1000, max = 1000000))
fr_dept$foo5 <- floor(runif(96, min = 1000, max = 1000000))
fr_dept$foo6 <- floor(runif(96, min = 1000, max = 1000000))





# App ---------------------------------------------------------------------


library(shiny)

ui <- fluidPage(
  fluidRow(
    column(
      width = 10, offset = 1,
      tags$h2("topogRam : update value with proxy"),
      radioButtons(
        inputId = "new_value",
        label = "Variable to use:",
        choices = paste0("foo", 1:6),
        inline = TRUE
      ),
      topogRamOutput(outputId = "carto", height = "600px")
    )
  )
)

server <- function(input, output, session) {

  # Initialize
  output$carto <- renderTopogRam({
    topogRam(
      shape = fr_dept,
      value = "foo1",
      tooltip_label = ~name,
      n_iteration = 10
    )
  })

  # Update
  observeEvent(input$new_value, {
    topogramProxy(shinyId = "carto") %>%
      proxy_update_value(new_value = input$new_value)
  }, ignoreInit = TRUE)

}

shinyApp(ui, server)
