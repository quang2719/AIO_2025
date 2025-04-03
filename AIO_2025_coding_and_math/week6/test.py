import pygwalker as pyg
import pandas as pd

data = pd.read_csv('./advertising.csv')
pyg.walk(data)