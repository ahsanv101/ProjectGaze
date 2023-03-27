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

film_list_bechdel = list()

# Clean df from the movies that have not been tested for bechdel
bechdel_df = df.dropna(axis=0, subset=["bechdel_rating"])

# Iterate over df and save imdbId and Bechdel result in a tuple to append to the film_list
for idx, row in bechdel_df.iterrows():
    tuple = (row["imdbid"], row["bechdel_rating"])
    film_list_bechdel.append(tuple)

# Calculate the total movies which have been tested for bechdel
n_films = len(film_list_bechdel)    # 72

ids_list_bechdel = ()

for tpl in film_list_bechdel:
    ids_list_bechdel = ids_list_bechdel + (tpl[0],)


# Resulting df from QUERY (still to be populated)
Bechdel_df = pd.DataFrame(columns=["Movie", "Director", "Bechdel_result"])

# SPARQL query
query_gender_director = '''
        SELECT ?Movie ?Director
        WHERE {{
            ?movie wdt:P345 ?imdb ;
                    wdt:P57 ?director ;
                    rdfs:label ?Movie .
            ?director rdfs:label ?Director ;
                        wdt:P21 wd:Q6581097 .
            FILTER ((lang(?Director) = "en") && (lang(?Movie) = "en")) .
            FILTER ((?imdb IN {list}))
        }}
    '''

# Create resulting dataframe from query, formatting the query with the appropriate value for the variable {imdbid}
result_query = sparql_dataframe.get(
     wikidata_endpoint, query_gender_director.format(list=ids_list_bechdel), True)

  # Populate the external df as to not lose the information gathered with the query for each of the ids/films
Bechdel_df = pd.concat([Bechdel_df, result_query])

# Calculate the number of films with a male director (n. rows of the Bechdel_df)
total_Mdirectors = (len(Bechdel_df.index))  # 72
print(Bechdel_df)

# The total number of films tested for the Bechdel test and the total number of films tested for the Bechdel test AND with a male director is the same (a higher n. of male directors is due to the case in which a film has more than one director) -> this means that, no matter the result of the Bechdel test, ALL SELECTED MOVIES HAVE MALE DIRECTORS


# -- Characters dialogues: what is the proportion between male and female writers in the [selected] films?


# ---- Male gaze queries
# -- MG1: To what genre belong the top 10 films in the gaze score ranking?
# -- MG2: Is there any correlation between rank in the gaze score ranking, box-office, and production costs?
# -- MG3: Is there any decade in which the films rank higher in the gaze score ranking?
