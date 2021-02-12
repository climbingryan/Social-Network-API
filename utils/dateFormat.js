const moment = require('moment');

const dateFormat = function(time) {
    return moment(time).format("dddd, MMMM Do YYYY, h:mm:ss a");
}

module.exports = dateFormat;