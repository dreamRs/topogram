


# Shiny example -----------------------------------------------------------


# packages
library("shiny")
library("topogRam")
library("RColorBrewer")

# data
data(frRegPop)
data(frDptPop)
data(frReg2016Pop)

# ui
ui <- fluidPage(

  tags$div(
    style = "width: 800px; margin: auto;",
    tags$h1("France cartogram", style = "color: steelblue;"),
    br(),
    radioButtons(inputId = "shape", label = "Shape : ", inline = TRUE,
                 choices = c("france-reg", "france-reg-2016", "france-dep")),
    topogRamOutput(outputId = "topo")
  )

)

# server
server <- function(input, output){

  output$topo <- renderTopogRam({
    params <- switch(
      input$shape,
      "france-reg" = list(dat = frRegPop, geo_lab = "region"),
      "france-reg-2016" = list(dat = frReg2016Pop, geo_lab = "region2016"),
      "france-dep" = list(dat = frDptPop, geo_lab = "departement")
    )
    topogRam(
      data = params$dat, shape = input$shape,
      key_var = c(
        "P13_POP", "C13_POP15P_CS1", "C13_POP15P_CS2", "C13_POP15P_CS3", "C13_POP15P_CS4",
        "C13_POP15P_CS5", "C13_POP15P_CS6", "C13_POP15P_CS7", "C13_POP15P_CS8"
      ), colors = brewer.pal("Blues", n = 7), geo_lab = params$geo_lab
    )
  })

}

# App
shinyApp(ui = ui, server = server)
