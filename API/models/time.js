class Time {
  constructor(hour = true, minute = false, second = false) {
    this.timeNow = Date.now();
    this.time = new Date(this.timeNow);
    this.hour = hour;
    this.minute = minute;
    this.second = second;
    this.Ftime = "";
  }
  update() {
    this.time = new Date(Date.now());
    if (this.hour) this.Ftime = this.time.getHours();
    if (this.minute)
      this.Ftime += ":" + (this.time.getMinutes() - 1).toString();
    if (this.second) this.Ftime += ":" + this.time.getSeconds();
  }
}
module.exports = Time;
