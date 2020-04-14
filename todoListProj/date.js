exports.getDate = () => {
    const options = {
        weekday : "long",
        day : "numeric",
        month : "long"
    };

    const today = new Date();
    const todayStr = today.toLocaleDateString("en-US", options)
    const day = today.getDay();
    const ret = [];
    ret.push(todayStr,day)
    return ret;
}

exports.getDay = () =>{
    const today = new Date();
    const options = {
        weekday : "long"
    };
    const todayStr = today.toLocaleDateString("en-US", options)
    return todayStr;
};