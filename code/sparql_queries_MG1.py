import pandas as pd
import sparql_dataframe


wikidata_endpoint = "https://query.wikidata.org/bigdata/namespace/wdq/sparql?query={SPARQL}"

# -- MG1: To what genre belong the top 10 films in the gaze score ranking?
df_MG = pd.read_csv("")