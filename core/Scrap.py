import requests as req
import json
from bs4 import BeautifulSoup as BS, element
import re as Regex
import time


def scraper(url, regex, Header, delay, delay_multi):
    """
    url: target site url (tgju.org)\n
    regex: targeted content regex for scraping data\n
    Header: a header for requests to handle secure connection\n
    delay: the time delay between failed requests\n
    delay_multi: a multipier for increasing the delay 
    """
    time_delay = delay if delay >= 40 else delay * delay_multi

    try:
        SiteData = req.get(url, headers=Header)
    except req.exceptions.RequestException as e:
        print(
            "server respose: [delay {}s] - {}".format(time_delay, e.args))
        time.sleep(time_delay)
        return scraper(config, time_delay, 2)

    print("server respose : {}".format(SiteData.status_code))
    SoupData = BS(SiteData.text, "html.parser").find_all('tbody',
                                                         attrs={'class': 'table-padding-lg'})

    # test the soup output:
    # with open('./core/output', 'w') as output:
    #     output.write(SoupData[0].text)

    CorrentPrice = Regex.findall(regex, SoupData[0].text)[0]
    return (CorrentPrice)
