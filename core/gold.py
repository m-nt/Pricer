import requests as req
import json
from bs4 import BeautifulSoup as BS
import re as Regex

# take the config file with all regexes and urls and ...
with open('config.json') as json_data:
    config = json.load(json_data)


sitedata = req.get(config["Gold"]["url"], headers=config["Header"])
print(sitedata.status_code)
