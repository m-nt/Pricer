const Jdate = require('jalali-date')

class Date {
    constructor() {
        this.jdate = new Jdate()
    }
    Update() {
        this.jdate = new Jdate()
        console.log(this.jdate.date);
        return `${this.jdate.date[0]}/${this.jdate.date[1]}/${this.jdate.date[2]}`
    }
}
module.exports = new Date