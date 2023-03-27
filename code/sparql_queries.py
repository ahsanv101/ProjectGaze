#
##
###
# SPARQL QUERIES on the Wikidata endpoint
###
##
#

import pandas as pd
import sparql_dataframe


wikidata_endpoint = "https://query.wikidata.org/bigdata/namespace/wdq/sparql?query={SPARQL}"

# ---- Characters queries
# -- Bechdel test: how many of the [selected and tested for bechdel] films have *male* directors?

# -- Characters dialogues: what is the proportion between male and female writers in the [selected] films?


# ---- Male gaze queries
# -- MG1: To what genre belong the top 10 films in the gaze score ranking?
# -- MG2: Is there any correlation between rank in the gaze score ranking, box-office, and production costs?
# -- MG3: Is there any decade in which the films rank higher in the gaze score ranking?
