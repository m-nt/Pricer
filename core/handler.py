import gold
import json

# take the config file with all regexes and urls and ...
with open('./core/config.json') as json_data:
    config = json.load(json_data)

print(gold.Gold_Corrent_Prise(config))
