#merge final results to get the score

import os
import pandas as pd

cwd = os.getcwd()
path ="/".join(list(cwd.split('/')[0:-1])) 

print(path)
df_bechdel_dialogue = pd.read_csv(path+ '/Data/Dialogue/dialogue_bechdel.csv')
df_descriptions= pd.read_csv(path+ "/Data/Descriptions/fem_descriptions_df.csv")

final_scores = pd.merge(df_bechdel_dialogue,df_descriptions, left_on='Title',right_on="movie",how='left')

print(final_scores)