library(topogram)
library(tinytest)

# topogram
topo <- topogram(world, "pop_est")
expect_inherits(topo, "topogram")

topo_html <- topogram:::topogram_html(id = "ID", NULL, NULL)
expect_inherits(topo_html, "shiny.tag")
expect_true(grepl(pattern = "ID-topogram", x = as.character(topo_html)))


# proxy
session <- shiny::MockShinySession$new()
proxy <- topogram_proxy("ID", session = session)
expect_inherits(proxy, "topogram_Proxy")
expect_inherits(topogram_proxy_iteration(proxy, n_iteration = 50), "topogram_Proxy")
expect_inherits(topogram_proxy_update(proxy, sfobj = world, value = "pop_est"), "topogram_Proxy")

# title
topo_title <- topogram_labs(topo, title = "This is a test")
expect_inherits(topo_title, "topogram")
expect_identical(as.character(topo_title$x$labsOpts$title), "This is a test")

proxy_title <- topogram_labs(proxy, title = "This is a test")
expect_inherits(proxy_title, "topogram_Proxy")


# legend
topo_legend <- topogram_legend(topo, title = "This is a test")
expect_inherits(topo_legend, "topogram")

proxy_legend <- topogram_legend(proxy, colors = c("#ffffff", "#000000"), title = "This is a test")
expect_inherits(proxy_legend, "topogram_Proxy")


# topogram_select
sel <- topogram_select("ID", world, "pop_est")
expect_inherits(sel, "topogram_select")

sel_html <- topogram:::topogram_select_html(id = "ID", NULL, NULL)
expect_inherits(sel_html, "shiny.tag")
expect_identical(sel_html$name, "select")


# bad use
expect_error(topogram(iris, "Sepal.Width"))
expect_error(topogram(world, "bad_variable"))
worldna <- world
worldna$pop_est[1] <- NA
expect_error(topogram(worldna, "pop_est"))
