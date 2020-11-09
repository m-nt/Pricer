import requests as req
import json
from bs4 import BeautifulSoup as BS, element
import re as Regex
import time

# take the config file with all regexes and urls and ...
with open('./core/config.json') as json_data:
    config = json.load(json_data)


class Scraper:
    def __init__(self, ItemName, rgxName, delay, delay_multi):
        """
        ItemName: target item name for url (tgju.org)\n
        rgxName: target regex name for regex for scraping data\n
        Header: a header for requests to handle secure connection\n
        delay: the time delay between failed requests\n
        delay_multi: a multipier for increasing the delay
        """
        self.name = ItemName
        self.rgx = rgxName
        self.Fdelay = delay
        self.delay = delay
        self.multi = delay_multi

    def Update(self):

        SiteData = self.Initialize_request()

        SoupData = BS(SiteData.text, "html.parser").find_all('tbody',
                                                             attrs={'class': 'table-padding-lg'})

        # test the soup output:
        # with open('./core/output', 'w') as output:
        #     output.write(SoupData[0].text)

        CorrentPrice = Regex.findall(
            config["reg"][self.rgx], SoupData[0].text)[0]
        return CorrentPrice

    def Initialize_request(self):
        url = config["url"]+config[self.name]["url"]
        time_delay = self.delay if self.delay >= 40 else self.delay * self.multi

        try:
            r = req.get(url, headers=config["Header"])
        except req.exceptions.RequestException as e:
            code = "Failed to establish a new connection" if e.errno == None else e.errno
            print(
                "server respose: [delay {}s] - {}".format(time_delay, code))
            self.logData(code, url)
            time.sleep(time_delay)
            self.delay = time_delay
            return self.Initialize_request()
        self.delay = self.Fdelay

        self.logData(r.status_code, url)

        return r

    def logData(self, res_code, url):
        log = "[{}] server respose for {}: (stat: {}) - [url: {}]\n".format(
            time.ctime(),
            self.name,
            res_code,
            url)
        with open('./core/log', 'a') as output:
            output.write(log)
