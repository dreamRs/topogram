library(topogram)
library(shiny)

ui <- fluidPage(
  tags$h2("Update topogram's labs with proxy"),
  fluidRow(
    column(
      width = 3,
      textInput("title", "Title"),
      textInput("subtitle", "Subtitle"),
      textInput("caption", "Caption")
    ),
    column(
      width = 9,
      topogramOutput(outputId = "ID", height = "800px")
    )
  )
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
  observe({
    topogram_proxy("ID") %>% 
      topogram_labs(
        title = input$title,
        subtitle = input$subtitle,
        caption = input$caption
      )
  })
  
}

if (interactive())
  shinyApp(ui, server)