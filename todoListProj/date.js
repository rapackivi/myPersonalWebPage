function getDate(){
        const listOfDays = ["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"]
    var options = {
        weekday : "long",
        day : "numeric",
        month : "long"
    };

    const today = new Date();
    const todayStr = today.toLocaleDateString("en-US", options)
    const day = today.getDay();
    var ret = [];
    ret.push(todayStr,day)
    return ret;
}

function getDay(){
    const today = new Date();
    var options = {
        weekday : "long"
    };
    const todayStr = today.toLocaleDateString("en-US", options)
    return todayStr;
}

module.exports.getDate = getDate;

module.exports.getDay = getDay;