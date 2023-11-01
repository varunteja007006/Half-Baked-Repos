import pandas as pd
import numpy as np

# Create a DataFrame
# df = pd.DataFrame({'name': ['Alice', 'Bob', 'Carol'], 'age': [25, 30, 35]})
# df.to_csv("output.csv", index=False)
# '''
# Output ->
# name,age
# Alice,25
# Bob,30
# Carol,35
# '''


df_read = pd.read_excel('data.xlsx', "Sheet1")

print(df_read['Date'][:10])

str = ''
for col in df_read.columns:
    str = str.replace(" ",'') + col

print(str)