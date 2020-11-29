const Jdate = require('jalali-date')

class _Date {
    constructor() {
        this.jdate = new Jdate()
    }
    Update() {
        this.jdate = new Jdate()
        let da = new Date()
        return [
            this.jdate.date[0],
            this.jdate.date[1],
            this.jdate.date[2],
            da.getHours(),
            da.getMinutes(),
            da.getSeconds()]
    }
}
module.exports = new _Date