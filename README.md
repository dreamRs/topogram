# topogram

> Cartogram htmlwidget for visualizing geographical data by distorting a TopoJson topology, using [cartogram-chart](https://github.com/vasturiano/cartogram-chart)

<!-- badges: start -->
[![Project Status: Active – The project has reached a stable, usable state and is being actively developed.](http://www.repostatus.org/badges/latest/active.svg)](http://www.repostatus.org/)
[![R-CMD-check](https://github.com/dreamRs/topogram/workflows/R-CMD-check/badge.svg)](https://github.com/dreamRs/topogram/actions)
[![Codecov test coverage](https://codecov.io/gh/dreamRs/topogram/branch/master/graph/badge.svg)](https://app.codecov.io/gh/dreamRs/topogram?branch=master)
<!-- badges: end -->


### Installation

Install from [GitHub](https://github.com/dreamRs/topogram):

```r
remotes::install_github("dreamRs/topogram")
```


### Overview

![](man/figures/topogram.png)

Created with:

```r
library(topogram)
world %>% 
  topogram( 
    value = "pop_est", 
    label = "{name}: {format(pop_est, big.mark = ',')}",
    palette = scales::col_bin("viridis", bins = 20, domain = NULL)
  ) %>% 
  topogram_legend(
    title = "Population",
    formatter = scales::label_comma()
  ) %>% 
  topogram_labs(
    title = "World population",
    subtitle = "Population estimate for 2017",
    caption = "Data source: NaturalEarth"
  )
```

More examples in the [{pkgdown} website](https://dreamrs.github.io/topogram/)


## Development

This package use [{packer}](https://github.com/JohnCoene/packer) to manage JavaScript assets, see packer's [documentation](https://packer.john-coene.com/#/) for more.

Install nodes modules with:

```r
packer::npm_install()
```

Modify `srcjs/widgets/topogram.js`, then run:

```r
packer::bundle()
```

Re-install R package and try `topogram()` functions.
