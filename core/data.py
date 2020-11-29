import TmConv
import time


class Data():
    def __init__(self, content):
        self.content = content
        self.corrent = '-'
        self.object = {}

    def update(self):
        Cp, name = self.content.Update()

        if Cp != self.corrent:
            self.corrent = Cp

        self.object = {
            "name": name,
            "corrent": self.corrent,
            "date": self.time_date(),
        }

    def time_date(self):
        [y, m, d] = TmConv.gregorian_to_jalali(
            time.localtime().tm_year, time.localtime().tm_mon, time.localtime().tm_mday)
        h = time.localtime().tm_hour
        _m = time.localtime().tm_min
        s = time.localtime().tm_sec
        return [y, m, d, h, _m, s]

    def rearange(self, f):
        st = ''
        for i in range(0, len(f), 3):
            holder = f[i:i+3]
            st += holder + "," if i < len(f) - 3 else holder
        return st

    def arange(self, f):
        return int(f.replace(',', ''))
