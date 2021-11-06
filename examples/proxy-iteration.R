library(topogram)
library(shiny)

ui <- fluidPage(
  tags$h2("Update number of iteration with proxy"),
  sliderInput(
    inputId = "n_iteration", 
    label = "Number of iteration (more takes longer)",
    min = 1, 
    max = 60,
    value = 10
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
  observeEvent(input$n_iteration, {
    topogram_proxy_iteration("ID", input$n_iteration)
  }, ignoreInit = TRUE)
  
}

if (interactive())
  shinyApp(ui, server)