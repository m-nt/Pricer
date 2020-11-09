import goldenCoin
import json
import time
# take the config file with all regexes and urls and ...
with open('./core/config.json') as json_data:
    config = json.load(json_data)
golden_coin = goldenCoin.GoldenCoin(10)

# print(gold.Gold_Corrent_Prise(config))
if __name__ == "__main__":
    init = 0
    while True:
        init += 1
        time.sleep(2)
        golden_coin.update(config)
        print(golden_coin.object)
