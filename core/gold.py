import requests as req
import json
from bs4 import BeautifulSoup as BS, element
import re as Regex

# take the config file with all regexes and urls and ...
with open('./core/config.json') as json_data:
    config = json.load(json_data)


SiteData = req.get(config["Gold"]["url"], headers=config["Header"])
print(SiteData.status_code)

SoupData = BS(SiteData.text, "html.parser").find_all('tbody',
                                                     attrs={'class': 'table-padding-lg'})

# test the soup output
""" with open('./core/output', 'w') as output:
    output.write(SoupData[0].text)
 """

CorrentPrice = Regex.findall(config["Gold"]["regex"], SoupData[0].text)[0]
print(CorrentPrice.replace(',', ''))
