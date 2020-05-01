/* Function to format strings like Python 
   string.format({k1:v1, k2:v2, ...})
*/
String.prototype.formatUnicorn = String.prototype.formatUnicorn || function () {
    "use strict";
    var str = this.toString();
    if (arguments.length) {
        var t = typeof arguments[0];
        var key;
        var args = ("string" === t || "number" === t) ?
            Array.prototype.slice.call(arguments)
            : arguments[0];

        for (key in args) {
            str = str.replace(new RegExp("\\{" + key + "\\}", "gi"), args[key]);
        }
    }

    return str;
};

function getMonthString(datetimeObject) {
    var months = ['january','february','march','april','may','june','july','august',
                    'september','october','november','december'];
    return months[datetimeObject.getMonth()]; // getMonth method returns the month of the date (0-January :: 11-December)
}

/**
 * Function to compare datetime to sort the messages
 * @param {msgObject} msgA 
 * @param {msgObject} msgB 
 */
function datetimeCompare(msgA, msgB) {
    const datetimeA = msgA.datetime;
    const datetimeB = msgB.datetime;
  
    let comparison = 0;
    if (datetimeA > datetimeB) {
      comparison = -1;
    } else if (datetimeA < datetimeB) {
      comparison = 1;
    }
    return comparison;
}
