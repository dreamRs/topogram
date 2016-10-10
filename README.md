
# topogRam

Make interactive cartograms with `d3.js` based on this [example](https://github.com/shawnbot/topogram) by Shawn Allen. I also used this [example](http://www.comeetie.fr/galerie/d3-cartogram/) by Etienne Côme.

For France, boundaries come from [OpenStreetMap](https://www.openstreetmap.org/#map=7/47.324/0.406), data from [INSEE](http://www.insee.fr/fr/themes/detail.asp?reg_id=99&ref_id=base-cc-evol-struct-pop-2013).

For USA, boundaries and data come from Shawn Allen's [project](https://github.com/shawnbot/topogram)


### Installation

To install:

```r
if (!require("devtools")) install.packages("devtools")
devtools::install_github("pvictor/topogRam")
```

### Usage

You can use it like any other htmlwidget :

```r
library("topogRam")
data(frRegPop)
topogRam(
  data = frRegPop,
  key_var = "P13_POP",
  geo_lab = "region",
  colors = c("#FEE0D2", "#FC9272", "#DE2D26")
)
```


### Examples

See the [examples](https://github.com/pvictor/topogRam/tree/master/inst/examples).

Or check these examples :

* [USA example](http://rpubs.com/Victorp/topogRam_USA)
* [France example](http://rpubs.com/Victorp/topogRam_France)




