library(topogram)
library(shiny)

ui <- fluidPage(
  tags$h2("Update topogram with proxy"),
  radioButtons(
    inputId = "new_value",
    label = "Select a variable:",
    choices = names(world)[3:7],
    inline = TRUE
  ),
  topogramOutput(outputId = "ID", height = "800px")
)

server <- function(input, output, session) {

  # Initialize the topogram (non reactive)
  output$ID <- renderTopogram({
    topogram(
      sfobj = world,
      value = "pop_est", 
      label = "{name} : {value}"
    )
  })

  # Update with proxy
  observeEvent(input$new_value, {
    topogram_proxy_update(
      "ID", world, 
      value = input$new_value,
      label = "{name} : {value}"
    )
  }, ignoreInit = TRUE)

}

if (interactive())
  shinyApp(ui, server)
