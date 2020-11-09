import Scrap
import json
import time
import data


golden_coin = data.Data(Scrap.Scraper("GoldCoin", "rgx_corrent", 0.1, 2))

Gold18 = data.Data(Scrap.Scraper("Gold18", "rgx_corrent", 0.1, 2))

Gold24 = data.Data(Scrap.Scraper("Gold24", "rgx_corrent", 0.1, 2))

USD = data.Data(Scrap.Scraper("USD", "rgx_corrent", 0.1, 2))
# print(gold.Gold_Corrent_Prise(config))
if __name__ == "__main__":
    init = 0
    while True:
        init += 1
        time.sleep(2)
        golden_coin.update()
        # USD.update()
        print(golden_coin.object)
        # print(USD.object)
