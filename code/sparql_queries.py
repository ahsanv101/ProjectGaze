#
##
###
# SPARQL QUERIES on the Wikidata endpoint
###
##
#

import pandas as pd
import sparql_dataframe


wikidata_endpoint = "https://query.wikidata.org/sparql"

# ---- Characters queries
df = pd.read_csv('data/dialogue/dialogue_bechdel.csv')

# -- Bechdel test: how many of the [selected and tested for bechdel] films have *male* directors?

# Function to add Wikidata suffix to the IMDB id
def createIMDBid(code):
    if len(str(code)) == 5:
        return "tt00"+str(code)
    elif len(str(code)) == 6:
        return "tt0"+str(code)
    elif len(str(code)) == 7:
        return "tt"+str(code)


film_list_bechdel = list()

# Clean df from the movies that have NOT been tested for bechdel
bechdel_df = df.dropna(axis=0, subset=["bechdel_rating"])

# Iterate over df and save IMDB id and Bechdel result in a tuple to append to the film_list_bechdel
for idx, row in bechdel_df.iterrows():
    imdb_id = createIMDBid(row["imdbid"])
    tuple = (imdb_id, row["bechdel_rating"])
    film_list_bechdel.append(tuple)

# Calculate the total movies which have been tested for bechdel
n_films = len(film_list_bechdel)    # 72

# Now the list of IMDB ids is fully populated
# If the bechdel_rating is:
# 0: it FAILED the first criteria
# 1: it FAILED the second criteria
# 2: it FAILED the third criteria
# 3: it PASSED the test

# STEPS FOR SPARQL QUERY
# Create tuple of IDs only (not the information on the outcome of the Bechdel test) -> this will be useful for the SPARQL query
ids_tpl_bechdel = ()

# Populate tuple with the formatted IMDB ids
for tpl in film_list_bechdel:
    ids_tpl_bechdel = ids_tpl_bechdel + (tpl[0],)

# SPARQL query
query_gender_director = '''
        SELECT ?imdb ?Movie ?Director
        WHERE {{
            ?movie wdt:P345 ?imdb ;
                    wdt:P57 ?director ;
                    rdfs:label ?Movie .
            ?director rdfs:label ?Director ;
                        wdt:P21 wd:Q6581097 .
            FILTER ((lang(?Director) = "en") && (lang(?Movie) = "en")) .
            FILTER (?imdb IN {list}) .
        }}
    '''

# Create resulting dataframe from query, formatting the query with the appropriate value for the variable {list}
result_bechdel_query = sparql_dataframe.get(
    wikidata_endpoint, query_gender_director.format(list=ids_tpl_bechdel), True)

# Now we want to add the outcome of the Bechdel test to the result of the query (could be useful in future visualizations)
# Create a new df from the list of tuples
add_bech_df = pd.DataFrame(film_list_bechdel, columns=[
                           "imdb", "Bechdel_result"])

# Merge the two dataframes together using the IMDB ids columns
result_bechdel_query = result_bechdel_query.merge(
    add_bech_df, left_on="imdb", right_on="imdb")


# Calculate the number of films with a male director (n. rows of the result_query df)
total_Mdirectors = (len(result_bechdel_query.index))  # 72

# The total number of films tested for the Bechdel test and the total number of films tested for the Bechdel test AND with a male director is the same (a higher n. of male directors is due to the case in which a film has more than one director) -> this means that, no matter the result of the Bechdel test, ALL SELECTED MOVIES HAVE MALE DIRECTORS

# ----------------------

# -- Characters dialogues: what is the proportion between male and female writers in the [selected] films?

film_list_dlg = list()

# Clean df from the movies that have NO dialogue % analysis
dlg_df = df.dropna(axis=0, subset=["male_percen"])

# Iterate over df and save IMDB id and dialogue % in a tuple to append to film_list_dlg
for idx, row in dlg_df.iterrows():
    imdb_id = createIMDBid(row["imdbid"])
    tuple = (imdb_id, row["male_percen"], row["nonmale_percentage"])
    film_list_dlg.append(tuple)

# Calculate the total movies which have dialogue % analysis
n_films = len(film_list_dlg)    # 66

# STEPS FOR SPARQL QUERY
# Tuple of IDs only (no info on dialogue %)
ids_tpl_dlg = ()

# Populate tuple with the formatted IMDB ids
for tpl in film_list_dlg:
    ids_tpl_dlg = ids_tpl_dlg + (tpl[0],)

# SPARQL query
query_gender_director = '''
    SELECT ?imdb ?Movie ?Writer ?Gender
    WHERE {{
        ?movie wdt:P345 ?imdb ;
                wdt:P58 ?writer ;
                rdfs:label ?Movie .
        ?writer rdfs:label ?Writer .
        OPTIONAL {{
            ?writer wdt:P21 ?gender .
            ?gender rdfs:label ?Gender .
            FILTER ( (lang(?Gender) = "en") )
        }}
        FILTER ( (lang(?Writer) = "en") && (lang(?Movie) = "en"))
        FILTER ( ?imdb IN {list} )
}}
'''
# The ?Gender is optional as this information was not available for all people

# Create resulting dataframe from query, formatting the query with the appropriate value for the variable {list}
result_dlg_query = sparql_dataframe.get(
    wikidata_endpoint, query_gender_director.format(list=ids_tpl_dlg), True)

# Now we want to add the outcome of the dialogue % analysis to the result of the query (could be useful in future visualizations)
# Create a new df from the list of tuples
add_dlg_df = pd.DataFrame(film_list_dlg, columns=[
                           "imdb", "male_percentage", "nonmale_percentage"])
print(result_dlg_query)
# Merge the two dataframes together using the IMDB ids columns
result_dlg_query = result_dlg_query.merge(
    add_dlg_df, left_on="imdb", right_on="imdb")


# Calculate the number of films with male or female writers
n_Mwriters = 0
n_Fwriters = 0
for idx, row in result_dlg_query.iterrows():
    if row["Gender"] == 'male':
        n_Mwriters += 1
    else:
        n_Fwriters += 1
# print("Number of male writers\t:", n_Mwriters)  # 143
# print("Number of female writers\t:", n_Fwriters)    # 11

result_dlg_query.to_csv('data/sparql/dlg.csv')




# ---- Male gaze queries
# -- MG1: To what genre belong the top 10 films in the gaze score ranking?
# -- MG2: Is there any correlation between rank in the gaze score ranking, box-office, and production costs?
# -- MG3: Is there any decade in which the films rank higher in the gaze score ranking?
