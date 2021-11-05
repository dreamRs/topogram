library(topogram)
library(shiny)

ui <- fluidPage(
  tags$h2("Update variable used to distort topology"),
  tags$h4("Use a column name of the original data"),
  radioButtons(
    inputId = "new_value",
    label = "Select a variable:",
    choices = names(world)[3:7],
    inline = TRUE
  ),
  topogramOutput(outputId = "ID", height = "800px")
)

server <- function(input, output, session) {

  # Initialize the cartogram (non reactive)
  output$ID <- renderTopogram({
    topogram(
      sfobj = world,
      value = "pop_est", 
      label = "{name} : {value}",
      n_iteration = 20
    )
  })

  # Update variable used (foo1, foo2, foo3, foo4)
  observeEvent(input$new_value, {
    topogram_proxy_update(
      "ID", world, 
      value = input$new_value,
      label = "{name} : {value}"
    )
  }, ignoreInit = TRUE)

}

shinyApp(ui, server)
