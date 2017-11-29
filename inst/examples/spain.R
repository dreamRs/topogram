library(topogRam)



data(esRegPop)
colnames(esRegPop)[-c(1,2)]<-paste("P",colnames(esRegPop)[c(-1,-2)],sep="")

key_var <-dlply(data.frame(name=paste("population",gsub("P","",names(esRegPop)[c(-1,-2)])),key=names(esRegPop)[c(-1,-2)], stringsAsFactors = F),1,c)
names(key_var)<-NULL

topogRam(
  data = esRegPop,
  key_var=key_var,
  origin= c(0,40),
  geo_id = "region_code",
  shape='spain-regions',
  geo_lab = "region"
)
