const Jdate = require('jalali-date')

class Time {
  constructor() {
    this.time = new Date(Date.now());
    this.jdate = new Jdate()
  }
  update(offset) {
    let off = []
    if (!offset) {
      off = [0, 0, 0, 0, 0, 0]
    } else {
      off = offset
    }
    this.time = new Date(Date.now());
    this.jdate = new Jdate()

    return [this.jdate.getFullYear() - off[0],
    this.jdate.getMonth() - off[1],
    this.jdate.getDate() - off[2],
    this.time.getHours() - off[3],
    this.time.getMinutes() - off[4],
    this.time.getSeconds() - off[5]]
  }
}
module.exports = new Time;
