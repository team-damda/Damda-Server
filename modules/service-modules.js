const convertUTCDateToLocalDate = (date) => {
    date.setMinutes(date.getMinutes() - date.getTimezoneOffset());
    return date;
};

const getYesterdayThisMin = () => {
    let d = new Date();
    d.setDate(d.getDate() - 1);
    d.setSeconds(0);
    d.setHours(d.getHours());
    d.setMinutes(d.getMinutes() - d.getTimezoneOffset());
    return d;
};
const getYesterdayNextMin = () => {
    let d = new Date();
    d.setDate(d.getDate() - 1);
    d.setMinutes(d.getMinutes() + 1);
    d.setSeconds(0);
    d.setHours(d.getHours());
    d.setMinutes(d.getMinutes() - d.getTimezoneOffset());
    return d;
};

const getTheDate = (d) => {
    /*
    INPUT
        new Date() 이 형식임
    
    OUTPUT 
        '2021/10/02' format으로 return
    */
    // TODO 타임 존 문제 ...
    const KR_TIME_DIFF = 9 * 60 * 60 * 1000;
    const kr_curr = new Date(d + KR_TIME_DIFF);
    // console.log(kr_curr);
    // console.log(kr_curr.toLocaleTimeString());
    const origin_list = d.toLocaleDateString().split("/");
    const thatDate =
        origin_list[2] + "/" + origin_list[0] + "/" + origin_list[1];
    return thatDate;
};

const getTheTime = (d) => {
    /*
    INPUT
        new Date() 이 형식임
    
    OUTPUT 
        '01:22' format으로 return
        d.getDay().toString().padStart(2 ,'0')
    */
    // console.log(d.toLocaleTimeString());
    const [origin_list, when] = d.toLocaleTimeString().split(" ");
    const [hour, min, sec] = origin_list.split(":");
    const hour24 = when === "PM" ? parseInt(hour) + 12 : parseInt(hour);
    return hour24.toString().padStart(2, "0") + ":" + min;
};

const getOverlapRemovedList = (list) => {
    const objUnique = {};

    list.forEach((el) => {
        objUnique[el] = true;
    });
    const arrUnique = Object.keys(objUnique);
    return arrUnique;
};

module.exports = {
    convertUTCDateToLocalDate,
    getYesterdayThisMin,
    getYesterdayNextMin,
    getTheDate,
    getTheTime,
    getOverlapRemovedList,
};
