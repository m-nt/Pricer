import requests as req
import json
from bs4 import BeautifulSoup as BS, element
import re as Regex
import time
import numpy as np
import TmConv


def Gold_Corrent_Prise(config, req_try):
    try:
        SiteData = req.get(config["Gold"]["url"], headers=config["Header"])
    except req.exceptions.RequestException as e:
        print("server respose: {}".format(e))
        time.sleep(1)
        return Gold_Corrent_Prise(config, req_try)

    print("server respose: {}".format(SiteData.status_code))

    SoupData = BS(SiteData.text, "html.parser").find_all('tbody',
                                                         attrs={'class': 'table-padding-lg'})

    # test the soup output:
    # with open('./core/output', 'w') as output:
    #     output.write(SoupData[0].text)

    CorrentPrice = Regex.findall(
        config["Gold"]["rgx_corrent"], SoupData[0].text)[0]
    return (CorrentPrice)


class GoldenCoin():
    def __init__(self, request_tries):
        self.reqt = request_tries
        self.corrent = '-'
        self.object = {}

    def update(self, config):
        Cp = Gold_Corrent_Prise(config, self.reqt)

        if Cp != self.corrent:
            self.corrent = Cp

        cdate, ctime = self.time_date()
        self.object = {
            "corrent": self.corrent,
            "date": cdate,
            "corrent_time": ctime
        }

    def time_date(self):
        [y, m, d] = TmConv.gregorian_to_jalali(
            time.localtime().tm_year, time.localtime().tm_mon, time.localtime().tm_mday)
        _hour = time.localtime().tm_hour
        _min = time.localtime().tm_min
        _sec = time.localtime().tm_sec
        return ("{}/{}/{}".format(y, m, d), "{}:{}:{}".format(_hour, _min, _sec))

    def rearange(self, f):
        st = ''
        for i in range(0, len(f), 3):
            holder = f[i:i+3]
            st += holder + "," if i < len(f) - 3 else holder
        return st

    def arange(self, f):
        return int(f.replace(',', ''))
