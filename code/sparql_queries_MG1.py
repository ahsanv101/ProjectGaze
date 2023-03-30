import pandas as pd
import sparql_dataframe


wikidata_endpoint = "https://query.wikidata.org/bigdata/namespace/wdq/sparql?query={SPARQL}"

df = pd.read_csv('data/dialogue/dialogue_bechdel.csv')

def createIMDBid(code):
    if len(str(code)) == 5:
        return "tt00"+str(code)
    elif len(str(code)) == 6:
        return "tt0"+str(code)
    elif len(str(code)) == 7:
        return "tt"+str(code)

# -- MG1: To what genre belong the top 10 films in the gaze score ranking?

# Clean df from the movies that have NO male gaze score
MG_df = df.dropna(axis=0, subset=["gaze_score"])

# Sort df according to "male gaze" score
MG_df.sort_values(by="gaze_score", ascending=False, inplace=True, ignore_index=True)


# Save only top 10 movies in the "male gaze" ordered df
topMG_df = MG_df.head(10)

film_list_mg1 = list()

# Iterate over df and save IMDB id and MG score in a tuple to append to the list
for idx, row in topMG_df.iterrows():
    imdb_id = createIMDBid(row["imdbid"])
    tuple = (imdb_id, row["gaze_score"])
    film_list_mg1.append(tuple)

# STEPS FOR SPARQL QUERY
# Tuple of IDs only (no info on MG score)
ids_tpl_mg1 = ()

# Populate tuple with formatted IMDB ids
for tpl in film_list_mg1:
    ids_tpl_mg1 = ids_tpl_mg1 + (tpl[0],)

# SPARQL query
query_10_mg = '''
    SELECT ?Movie ?Genre
    WHERE {{
        ?movie wdt:P345 ?imdb ;
                wdt:P136 ?genre ;
                rdfs:label ?Movie .
        ?genre rdfs:label ?Genre .
        FILTER ( (lang(?Writer) = "en") && (lang(?Movie) = "en"))
        FILTER ( ?imdb IN {list} )
    }}
'''

result_mg1_query = sparql_dataframe.get(wikidata_endpoint, query_10_mg.format(list=ids_tpl_mg1),True)

# Add to the resulting df also the male gaze score
add_mg1_df = pd.DataFrame(film_list_mg1,columns=["imdb", "gaze_score"])

result_mg1_query = result_mg1_query.merge(add_mg1_df,left_on="imdb",right_on="imdb")