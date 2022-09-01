export const getFormattedDate = (date) => {
    const year = date.getFullYear();
    const month = date.getMonth() + 1;
    const day = date.getDate();
    return `${day}-${month}-${year}`;
};

export const getDateMinusDays = (date, days) => {
    const newDate = new Date(date.getFullYear(), date.getMonth(), date.getDate() - days);
    return newDate;
};