import pandas as pd
import sparql_dataframe


wikidata_endpoint = "https://query.wikidata.org/bigdata/namespace/wdq/sparql?query={SPARQL}"
df = pd.read_csv('data/dialogue/dialogue_bechdel.csv')

# Function to add Wikidata suffix to the IMDB id
def createIMDBid(code):
    if len(str(code)) == 5:
        return "tt00"+str(code)
    elif len(str(code)) == 6:
        return "tt0"+str(code)
    elif len(str(code)) == 7:
        return "tt"+str(code)


# -- Characters dialogues: what is the proportion between male and female writers in the [selected] films?

film_list_dialogues = list()

dialogue_df = df.dropna(axis=0,subset=["dialogue_score"])

# Iterate over df and save imdbId, male_percentage, and nonmale_percentage in a tuple to append to the film_list
for idx, row in dialogue_df.iterrows():
    tuple = (row["imdbid"], row["male_percen"], row["nonmale_percentage"])
    film_list_dialogues.append(tuple)

# Calculate the total movies which have been tested for the dialogues percentage
n_films = len(film_list_dialogues)  # 66

Dialogues_df = pd.DataFrame(columns=["Movie","Writer", "Gender","male_percen","nonmale_percentage"])

# Scroll through the film_list_dialogues
for tpl in film_list_dialogues:
    # Add suffix to each id
    imdb_id = createIMDBid(tpl[0])

    # SPARQL query
    query_gender_writers = '''
    SELECT ?Movie ?Writer ?Gender 
    WHERE {{
        ?movie wdt:P345 '{imdbid}' ;
                wdt:P58 ?writer ;
                rdfs:label ?Movie .
        ?writer rdfs:label ?Writer ;
                wdt:P21 ?gender .
        ?gender rdfs:label ?Gender .
        FILTER ((lang(?Writer) = "en") && (lang(?Movie) = "en") && (lang(?Gender) = "en"))
    }}
    '''

    # Create resulting df
    result_query = sparql_dataframe.get(wikidata_endpoint,query_gender_writers.format(imdbid=imdb_id),True)

    # Populate external df
    Dialogues_df = pd.concat([Dialogues_df,result_query])
    Dialogues_df["male_percen"] = tpl[1]
    Dialogues_df["nonmale_percentage"] = tpl[2]

# Calculate the number of films with male or female writers
n_Mwriters = 0
n_Fwriters = 0
for idx, row in Dialogues_df.iterrows():
    if row["Gender"] == 'male':
        n_Mwriters += 1
    else:
        n_Fwriters += 1
print("Number of male writers\t:",n_Mwriters)
print("Number of female writers\t:",n_Fwriters)
 
# Now we can compare the two numbers 
    