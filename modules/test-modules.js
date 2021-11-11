const getHistory = (today) => {
    let now = today;
    let { year, month, day } = {
        year: now.getFullYear(),
        month: now.getMonth() + 1,
        day: now.getDate(),
    };
    let stDate = new Date(2021, 8, 2);
    let endDate = new Date(year, month, day);
    let btDate = endDate.getTime() - stDate.getTime();
    return btDate / (1000 * 60 * 60 * 24) + 1;
};

module.exports = {
    getHistory,
};
