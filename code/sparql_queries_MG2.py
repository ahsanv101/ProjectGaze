import pandas as pd
import sparql_dataframe
import json


wikidata_endpoint = "https://query.wikidata.org/bigdata/namespace/wdq/sparql?query={SPARQL}"

df_mg = pd.read_csv('data/final_scores/final_scores_df.csv')

def createIMDBid(code):
    if len(str(code)) == 5:
        return "tt00"+str(code)
    elif len(str(code)) == 6:
        return "tt0"+str(code)
    elif len(str(code)) == 7:
        return "tt"+str(code)
    
MG_df = df_mg.dropna(axis=0, subset=["gaze_score"])
MG_df.sort_values(by="gaze_score", ascending=False, inplace=True, ignore_index=True)


# -- MG2: Is there any correlation between rank in the gaze score ranking, box-office, and production costs?

film_list_mg2 = list()


# Iterate over df and save IMDB id and MG score in a tuple to append to the list
for idx, row in MG_df.iterrows():
    imdb_id = createIMDBid(row["imdbid"])
    tuple = (imdb_id, row["gaze_score"])
    film_list_mg2.append(tuple)


# STEPS FOR SPARQL QUERY
# Tuple of IDs only (no info on MG score)
ids_tpl_mg2 = ()

# Populate tuple with formatted IMDB ids
for tpl in film_list_mg2:
    ids_tpl_mg2 = ids_tpl_mg2 + (tpl[0],)


# SPARQL query
query_costs_mg = '''
SELECT ?imdb ?Movie ?ProductionCosts ?BoxOffice 
WHERE {{
  ?movie wdt:P345 ?imdb ;
        rdfs:label ?Movie .
  OPTIONAL {{
    ?movie wdt:P2130 ?ProductionCosts .
  }}
  OPTIONAL {{
    ?movie wdt:P2142 ?BoxOffice .
    ?statement ps:P2142 ?BoxOffice .
    ?statement pq:P3005 ?validity .
    }}
  FILTER ( (lang(?Movie) = "en") && ((?validity = wd:Q30) || (?validity = wd:Q49)) )
  FILTER NOT EXISTS {{ ?statement pq:P1264 ?o }}
  FILTER ( ?imdb in {list} )
}}
'''

result_mg2_query = sparql_dataframe.get(wikidata_endpoint, query_costs_mg.format(list=ids_tpl_mg2),True)

# Add to the resulting df also the male gaze score
add_mg2_df = pd.DataFrame(film_list_mg2,columns=["imdb", "gaze_score"])

result_mg2_query = result_mg2_query.merge(add_mg2_df,left_on="imdb",right_on="imdb")



# result_mg2_query.to_csv('data/sparql/mg2.csv')



# ------------------- 
# Transform the resulting df in a JSON object (for the visualization)
# ------------------- 

"""
# Drop unnecessary columns (imdb, Movie)
csv_2modify = pd.read_csv('data/sparql/mg2.csv')
csv_2modify = csv_2modify.drop(['Unnamed: 0','imdb'], axis=1)

# Update the values for Psycho's box office as it is a duplicate
index = 0
new_boxoffice = 0

for idx,row in csv_2modify.iterrows():
  if row["Movie"] == "Psycho":
    index = idx
    new_boxoffice += row["BoxOffice"]

csv_2modify = csv_2modify.drop(26).reset_index(drop=True)
csv_2modify.at[26,'BoxOffice'] = new_boxoffice

# csv_2modify = csv_2modify.drop(['Movie'], axis=1)

result = csv_2modify.to_json(orient="records")
data = json.loads(result)
json_object = json.dumps(data, indent=4)  

# Writing to sample.json
# with open("data/sparql/mg2.json", "w") as outfile:
    # outfile.write(json_object)
"""