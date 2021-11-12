library(topogram)

topogram(world, value = "pop_est") %>% 
  topogram_legend(title = "Population")

topogram(world, value = "pop_est", palette = "Blues") %>% 
  topogram_legend(
    title = NULL,
    formatter = scales::label_comma(),
    direction = "v"
  )
