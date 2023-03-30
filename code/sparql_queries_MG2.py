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
    
MG_df = df.dropna(axis=0, subset=["gaze_score"])
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
    ids_tpl_mg1 = ids_tpl_mg2 + (tpl[0],)

# SPARQL query
query_costs_mg = '''

SELECT ?Movie ?BoxOffice ?ProductionCosts
    WHERE {{
        ?movie wdt:P345 ?imdb ;
                wdt:P2142 ?boxoffice ;
               wdt:P2130 ?production ;
                rdfs:label ?Movie .
        OPTIONAL {
          ?boxoffice wdt:P3005 wd:Q30 ;
                   rdfs:label ?BoxOffice .
          FILTER (lang(?BoxOffice) = "en") 
          OPTIONAL {
            ?production rdfs:label ?ProductionCosts .
            FILTER (lang(?ProductionCosts) = "en")
          }
        }
        FILTER ( (lang(?Movie) = "en"))
        FILTER ( ?imdb IN ('tt0056172', 'tt0112462', 'tt0468569', 'tt0383574', 'tt0145487', 'tt0417741', 'tt0121766', 'tt0316654', 'tt0325980', 'tt0241527', 'tt0120755', 'tt4154796', 'tt1825683', 'tt2488496', 'tt0848228', 'tt2527336', 'tt0499549', 'tt0770828', 'tt3748528', 'tt1201607', 'tt1877832') )
 }} 





'''

result_mg2_query = sparql_dataframe.get(wikidata_endpoint, query_costs_mg.format(list=ids_tpl_mg2),True)

# Add to the resulting df also the male gaze score
add_mg2_df = pd.DataFrame(film_list_mg2,columns=["imdb", "gaze_score"])

result_mg2_query = result_mg2_query.merge(add_mg2_df,left_on="imdb",right_on="imdb")