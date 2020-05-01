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

function getMonthYearString(datetimeObject) {
    var month = datetimeObject.getMonth() + 1;
    var year = datetimeObject.getFullYear();

    if(month < 10){
        month = "0" + month;
    } else {
        month = String(month);
    }

    return month + year;
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

function getPreviousFileName(currentFileName) {
    var currentMonth = Number(currentFileName.substr(0, 2));
    var currentYear = Number(currentFileName.substring(2, 6));

    var newMonth = currentMonth;
    var newYear = currentYear;
    if(currentMonth > 1) {
        newMonth = currentMonth - 1;
        if (newMonth < 10) {
            newMonth = "0" + newMonth; 
        } else {
            newMonth = String(newMonth);
        }
    } else {
        newMonth = "12";
        newYear = currentYear - 1;
        newYear = String(newYear);
    }

    return String(newMonth) + String(newYear);
}
