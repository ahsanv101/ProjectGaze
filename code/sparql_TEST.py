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

df = pd.read_csv('data/dialogue/dialogue_bechdel.csv')

# Resulting df from QUERY (still to be populated)
Bechdel_df = pd.DataFrame(columns=["Movie", "Director", "Bechdel_result"])

# Scroll through the film_list_bechdel
# Add suffix to each id

# SPARQL query
query_gender_director = '''
        SELECT ?Movie ?Director
        WHERE {{
            ?movie wdt:P345 'tt0038969' ;
                    wdt:P57 ?director ;
                    rdfs:label ?Movie .
            ?director rdfs:label ?Director ;
                        wdt:P21 wd:Q6581097 .
            filter ((lang(?Director) = "en") && (lang(?Movie) = "en"))
        }}
    '''

# Create resulting dataframe from query, formatting the query with the appropriate value for the variable {imdbid}
result_query = sparql_dataframe.get(
    wikidata_endpoint, query_gender_director, True)

# Populate the external df as to not lose the information gathered with the query for each of the ids/films
Bechdel_df = pd.concat([Bechdel_df, result_query])


# Calculate the number of films with a male director (n. rows of the Bechdel_df)
total_Mdirectors = (len(Bechdel_df.index))  # 72
print(Bechdel_df)

Dialogues_df = pd.DataFrame(columns=["Movie","Writer", "Gender","male_percen","nonmale_percentage"])

# SPARQL query
query_gender_writers = '''
    SELECT ?Movie ?Writer ?Gender 
    WHERE {{
        ?movie wdt:P345 'tt0038969' ;
                wdt:P58 ?writer ;
                rdfs:label ?Movie .
        ?writer rdfs:label ?Writer ;
                wdt:P21 ?gender .
        ?gender rdfs:label ?Gender .
        filter ((lang(?Writer) = "en") && (lang(?Movie) = "en") && (lang(?Gender) = "en"))
    }}
    '''

# Create resulting df
result_query = sparql_dataframe.get(
    wikidata_endpoint, query_gender_writers, True)

# Populate external df
Dialogues_df = pd.concat([Dialogues_df, result_query])

# Calculate the number of films with male or female writers
n_Mwriters = 0
n_Fwriters = 0
for idx, row in Dialogues_df.iterrows():
    if row["Gender"] == 'male':
        n_Mwriters += 1
    else:
        n_Fwriters += 1
print("Number of male writers\t:", n_Mwriters)
print("Number of female writers\t:", n_Fwriters)
