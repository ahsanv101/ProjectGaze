#
##
###
# SPARQL QUERIES on the Wikidata endpoint
###
##
#

import pandas as pd
import sparql_dataframe


wikidata_endpoint = "https://query.wikidata.org/bigdata/namespace/wdq/sparql"

# ---- Audience query
# What audience is the most sexist? (gender from SPARQL and sexism score from webscraping)
    # This query could be implemented as an audience visualization directly, as the Genre value is already present in the finalmovies.csv file
    # So idk if we should keep it here or just in the audience section


# ---- Characters queries
# -- Bechdel test: how many of the [selected and tested for bechdel] films have *male* directors?

df = pd.read_csv('data/dialogue/dialogue_bechdel.csv')

film_list_bechdel = list()

# Clean df from the movies that have not been tested for bechdel
bechdel_df = df.dropna(axis=0,subset=["bechdel_rating"])

# Iterate over df and save imdbId and Bechdel result in a tuple to append to the film_list
for idx, row in bechdel_df.iterrows():
    tuple = (row["imdbid"], row["bechdel_rating"])
    film_list_bechdel.append(tuple)

# Calculate the total movies which have been tested for bechdel
n_films = len(film_list_bechdel)    # 72

# Now the list of IMDB ids is fully populated
    # If the bechdel_rating is:
        # 0: it FAILED the first criteria
        # 1: it FAILED the second criteria
        # 2: it FAILED the third criteria
        # 3: it PASSED the test

# Function to add Wikidata suffix to the IMDB id
def createIMDBid(code):
    if len(str(code)) == 5:
        return "tt00"+str(code)
    elif len(str(code)) == 6:
        return "tt0"+str(code)
    elif len(str(code)) == 7:
        return "tt"+str(code)


# Resulting df from QUERY (still to be populated)
Bechdel_df = pd.DataFrame(columns=["Movie", "Director", "Bechdel_result"])

# Scroll through the film_list
for tpl in film_list_bechdel:
    # Add suffix to each id
    imdb_id = createIMDBid(tpl[0])

    # SPARQL query
    query_gender_director = '''
        SELECT ?Movie ?Director
        WHERE {{
            ?movie wdt:P345 '{imdbid}' ;
                    wdt:P57 ?director ;
                    rdfs:label ?Movie .
            ?director rdfs:label ?Director ;
                        wdt:P21 wd:Q6581097 .
            filter ((lang(?Director) = "en") && (lang(?Movie) = "en"))
        }}
    '''

    # Create resulting dataframe from query, formatting the query with the appropriate value for the variable {imdbid}
    result_query = sparql_dataframe.get(wikidata_endpoint,query_gender_director.format(imdbid=imdb_id))
    
    # Populate the external df as to not lose the information gathered with the query for each of the ids/films
    Bechdel_df = pd.concat([Bechdel_df,result_query])

    if film_list_bechdel[1] == 0.0:
        Bechdel_df["Bechdel_result"] = "FAILED criteria 1"
    elif film_list_bechdel[1] == 1.0:
        Bechdel_df["Bechdel_result"] = "FAILED criteria 2"
    elif film_list_bechdel[1] == 2.0:
        Bechdel_df["Bechdel_result"] = "FAILED criteria 3"
    else:
        Bechdel_df["Bechdel_result"] = "PASSED"

# Calculate the number of films with a male director (n. rows of the Bechdel_df)
total_Mdirectors = (len(Bechdel_df.index))  # 72

# The total number of films tested for the Bechdel test and the total number of films tested for the Bechdel test AND with a male director is the same (a higher n. of male directors is due to the case in which a film has more than one director) -> this means that, no matter the result of the Bechdel test, ALL SELECTED MOVIES HAVE MALE DIRECTORS




# -- Characters dialogues: what is the proportion between male and female writers in the [selected] films?

film_list_dialogues = list()

dialogue_df = df.dropna(axis=0,subset=["dialogue_score"])

# Iterate over df and save imdbId, male_percentage, and nonmale_percentage in a tuple to append to the film_list
for idx, row in bechdel_df.iterrows():
    tuple = (row["imdbid"], row["male_percentage"], row["nonmale_percentage"])
    film_list_dialogues.append(tuple)

# Calculate the total movies which have been tested for the dialogues percentage
n_films = len(film_list_dialogues)    # 72






# ---- Male gaze queries
# -- MG1: To what genre belong the top 10 films in the gaze score ranking?
# -- MG2: Is there any correlation between rank in the gaze score ranking, box-office, and production costs?
# -- MG3: Is there any decade in which the films rank higher in the gaze score ranking?
