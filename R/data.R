
#' French population estimate as at 1er January 2018
#'
#' Data by department, gender and age.
#'
#' @format A data frame with 101 observations on the following 20 variables.
#' \describe{
#'   \item{\code{departements_code}}{Department code}
#'   \item{\code{departements_lib}}{Department label}
#'   \item{\code{ensemble_0_a_19_ans}}{Total population of people aged 0-19 years}
#'   \item{\code{ensemble_20_a_39_ans}}{Total population of people aged 20-39 years}
#'   \item{\code{ensemble_40_a_59_ans}}{Total population of people aged 40-59 years}
#'   \item{\code{ensemble_60_a_74_ans}}{Total population of people aged 60-74 years}
#'   \item{\code{ensemble_75_ans_et_plus}}{Total population of people aged 75 and over}
#'   \item{\code{ensemble_total}}{Total population}
#'   \item{\code{hommes_0_a_19_ans}}{Total population of men aged 0-19 years}
#'   \item{\code{hommes_20_a_39_ans}}{Total population of men aged 20-39 years}
#'   \item{\code{hommes_40_a_59_ans}}{Total population of men aged 40-59 years}
#'   \item{\code{hommes_60_a_74_ans}}{Total population of men aged 60-74 years}
#'   \item{\code{hommes_75_ans_et_plus}}{Total population of men aged 75 and over}
#'   \item{\code{hommes_total}}{Total population of men}
#'   \item{\code{femmes_0_a_19_ans}}{Total population of women aged 0-19 years}
#'   \item{\code{femmes_20_a_39_ans}}{Total population of women aged 20-39 years}
#'   \item{\code{femmes_40_a_59_ans}}{Total population of women aged 40-59 years}
#'   \item{\code{femmes_60_a_74_ans}}{Total population of women aged 60-74 years}
#'   \item{\code{femmes_75_ans_et_plus}}{Total population of women aged 75 and over}
#'   \item{\code{femmes_total}}{Total population of women}
#' }
#'
#' @keywords datasets
#'
#' @source INSEE (\url{https://www.insee.fr/fr/statistiques/1893198})
"pop_france"



#' Population of Paris by age in 2014
#'
#' An 'sf' object containing geometries and data.
#'
#' @format A data frame with 20 observations on the following 15 variables.
#' \describe{
#'   \item{\code{CODE_INSEE}}{Code of the district}
#'   \item{\code{LIB}}{Label of the district}
#'   \item{\code{NAME}}{Name of the district}
#'   \item{\code{AGE_00}}{Population under 3 years old}
#'   \item{\code{AGE_03}}{Population of people aged 3-5 years}
#'   \item{\code{AGE_06}}{Population of people aged 6-10 years}
#'   \item{\code{AGE_11}}{Population of people aged 11-17 years}
#'   \item{\code{AGE_18}}{Population of people aged 18-24 years}
#'   \item{\code{AGE_25}}{Population of people aged 25-39 years}
#'   \item{\code{AGE_40}}{Population of people aged 40-54 years}
#'   \item{\code{AGE_55}}{Population of people aged 55-64 years}
#'   \item{\code{AGE_65}}{Population of people aged 65-79 years}
#'   \item{\code{AGE_80}}{Population of people aged 80 and over}
#'   \item{\code{TOTAL}}{Population total}
#'   \item{\code{geometry}}{a sfc_POLYGON}
#' }
#'
#' @keywords datasets
#'
#' @source INSEE (\url{https://www.insee.fr/fr/statistiques/1893198}) and \url{opendata.paris.fr}
"paris"

