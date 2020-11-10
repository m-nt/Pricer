import Scrap
import json
import time
import data
from pymongo import MongoClient


# take the config file with all regexes and urls and ...
with open('./conf.json') as json_data:
    config = json.load(json_data)

# Mongodb client and collections
client = MongoClient(config["MongoURL"])
goldColl = client.Price.Gold
currColl = client.Price.Currency

# All currency Objects:
golden_coin = data.Data(Scrap.Scraper("GoldCoin", "rgx_corrent", 0.1, 2))
Gold18 = data.Data(Scrap.Scraper("Gold18", "rgx_corrent", 0.1, 2))
Gold24 = data.Data(Scrap.Scraper("Gold24", "rgx_corrent", 0.1, 2))
USD = data.Data(Scrap.Scraper("USD", "rgx_corrent", 0.1, 2))
EUR = data.Data(Scrap.Scraper("EUR", "rgx_corrent", 0.1, 2))
AED_sana = data.Data(Scrap.Scraper("AED_sana", "rgx_corrent", 0.1, 2))
CNY = data.Data(Scrap.Scraper("CNY", "rgx_corrent", 0.1, 2))
CHF = data.Data(Scrap.Scraper("CHF", "rgx_corrent", 0.1, 2))

# looping for update the currencies and send it to proper database
if __name__ == "__main__":
    init = 0
    while True:
        init += 1

        golden_coin.update()
        Gold18.update()
        Gold24.update()
        USD.update()
        EUR.update()
        AED_sana.update()
        CNY.update()
        CHF.update()

        goldColl.insert_many([
            golden_coin.object,
            Gold18.object,
            Gold24.object
        ])

        currColl.insert_many([
            USD.object,
            EUR.object,
            AED_sana.object,
            CNY.object,
            CHF.object
        ])

        # 30 recorde of every currency per day
        time.sleep(120)

        # print(USD.object)
