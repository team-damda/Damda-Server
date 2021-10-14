const convertUTCDateToLocalDate = (date) => {
    date.setMinutes(date.getMinutes() - date.getTimezoneOffset());
    return date;
};

const getYesterdayThisMin = () => {
    let d = new Date();
    d.setDate(d.getDate() - 1);
    d.setSeconds(0);
    d.setHours(d.getHours() - 10);
    d.setMinutes(d.getMinutes() - d.getTimezoneOffset());
    return d;
};
const getYesterdayNextMin = () => {
    let d = new Date();
    d.setDate(d.getDate() - 1);
    d.setMinutes(d.getMinutes() + 1);
    d.setSeconds(0);
    d.setHours(d.getHours() - 10);
    d.setMinutes(d.getMinutes() - d.getTimezoneOffset());
    return d;
};

module.exports = {
    convertUTCDateToLocalDate,
    getYesterdayThisMin,
    getYesterdayNextMin,
};
