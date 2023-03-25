#
##
###
# SPARQL QUERIES on the Wikidata endpoint
###
##
#

import pandas as pd
import sparql_dataframe


wikidata_endpoint = 'https://query.wikidata.org/bigdata/namespace/wdq/sparql?query={SPARQL}'

# ---- Audience query
# What audience is the most sexist? (gender from SPARQL and sexism score from webscraping)
    # This query could be implemented as an audience visualization directly, as the Genre value is already present in the finalmovies.csv file
    # So idk if we should keep it here or just in the audience section




# ---- Characters queries
# Bechdel test: how many of the [selected] films have *male* directors?

failed_bechdel_0 = [0]
failed_bechdel_1 = [1]
failed_bechdel_2 = [2]
passed_bechdel = ['p']


def formatNumber(n): return n if n % 1 else int(n)


def createList(path):
    df = pd.read_csv(path)  # Read the csv into a pandas dataframe
    values = df["imdbid"]   # Select the column with name "imdbid" (Series)
    for idx, val in values.items():
        val = formatNumber(val)  # Remove the decimal part from the values
        # Add values to appropriate list
        if 'failed_0' in path:
            failed_bechdel_0.append(val)
        elif 'failed_1' in path:
            failed_bechdel_1.append(val)
        elif 'failed_2' in path:
            failed_bechdel_2.append(val)
        else:
            passed_bechdel.append(val)


createList('data/bechdel/bechdel_failed_0.csv')
createList('data/bechdel/bechdel_failed_1.csv')
createList('data/bechdel/bechdel_failed_2.csv')
createList('data/bechdel/bechdel_passed.csv')

def createIMDBid(code):
    if len(str(code)) == 5:
        return "tt00"+str(code)
    elif len(str(code)) == 6:
        return "tt0"+str(code)
    elif len(str(code)) == 7:
        return "tt"+str(code)

# Sparql query


Bechdel_df = pd.DataFrame(columns=["Movie", "Director", "Bechdel_Result"])


def createDF(list,df):
    # Scroll through the list of numeric ids of the movie (w/o the suffix)
    for item in list:
        # Add the appropriate suffix to each id
        imdb_id = createIMDBid(item)

        # Select the movie title and director where the director's gender is MALE
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
        result_query = sparql_dataframe.get(wikidata_endpoint,query_gender_director.format(imdbid=imdb_id),True)
        # Modify the external dataframe as to not lose the information gathered with the query for each of the ids/films
        df = pd.concat([df,result_query])
        if list[0] == 0:
            df['Bechdel_Result'] = 'Failed rule 0'
        elif list[0] == 1:
            df["Bechdel_Result"] = "Failed rule 1"
        elif list[0] == 2:
            df["Bechdel_Result"] = "Failed rule 2"
        else:
            df["Bechdel_Result"] = "Passed"
    # Return true if function worked
    return df

bech0 = createDF(failed_bechdel_0,Bechdel_df)
bech1 = createDF(failed_bechdel_1,Bechdel_df)
bech2 = createDF(failed_bechdel_2,Bechdel_df)
bech_passed = createDF(passed_bechdel,Bechdel_df)

Bechdel_df_list = [bech0, bech1, bech2, bech_passed]
Bechdel_df = pd.concat(Bechdel_df_list)
total_Mdirectors = (len(Bechdel_df.index)) # This is the total male directors

print(Bechdel_df)
print(total_Mdirectors)
""" 
print("This is the failed bechdel 0 \n",x)
print("This is the failed bechdel 1",y)
print("This is the failed bechdel 2",z) """


""" for item in failed_bechdel_0:

    imdb_id = createIMDBid(item)

    failBech0_query = '''
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
    result_query = sparql_dataframe.get(
        wikidata_endpoint, failBech0_query.format(imdbid=imdb_id), True)
    failedBech_df = pd.concat([failedBech_df, result_query])

    print(failedBech_df)
    print(len(failedBech_df.index))
    # result_failBach0.to_csv('data/failedBach0.csv') """


''' QUERY 1 taken directly from Wikidata

SELECT ?Movie ?Director (COUNT (?director) AS ?totalMale)
WHERE {
    ?movie wdt:P345 'tt0080684' ;
           wdt:P57 ?director ;
           rdfs:label ?Movie .
  ?director rdfs:label ?Director ;
            wdt:P21 wd:Q6581097 .
  filter ((lang(?Director) = "en") && (lang(?Movie) = "en"))
 } GROUP BY ?Movie ?Director

'''


# Characters dialogues: what is the proportion between male and female writers in the [selected] films?


# ---- Male gaze queries
# MG1: To what genre belong the top 10 films in the gaze score ranking?
# MG2: Is there any correlation between rank in the gaze score ranking, box-office, and production costs?
# MG3: Is there any decade in which the films rank higher in the gaze score ranking?


""" 

query_predicate_repetition = '''
    SELECT ?
'''

df = sparql_dataframe.get(wikidata_endpoint, query_predicate_repetition)
print(f'The number of times each predicate is used:\n {df}')

 """
