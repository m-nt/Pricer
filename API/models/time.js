const Jdate = require('jalali-date')

class Time {
  constructor() {
    this.time = new Date(Date.now());
    this.jdate = new Jdate()
  }
  update(offset) {
    this.time = new Date(Date.now());
    this.jdate = new Jdate()

    return [this.jdate.getFullYear() - offset[0],
    this.jdate.getMonth() - offset[1],
    this.jdate.getDate() - offset[2],
    this.time.getHours() - offset[3],
    this.time.getMinutes() - offset[4],
    this.time.getSeconds() - offset[5]]
  }
}
module.exports = new Time;
