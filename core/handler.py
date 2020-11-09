import Scrap
import json
import time
import data
# take the config file with all regexes and urls and ...
with open('./core/config.json') as json_data:
    config = json.load(json_data)

golden_coin = data.Data(Scrap.scraper(
    config["Gold"]["url"], config["Gold"]["rgx_corrent"], 0.1, 2))

# print(gold.Gold_Corrent_Prise(config))
if __name__ == "__main__":
    init = 0
    while True:
        init += 1
        time.sleep(2)
        golden_coin.update()
        print(golden_coin.object)
