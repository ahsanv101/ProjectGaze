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

# -- MG3: Is there any decade in which the films rank higher in the gaze score ranking?
