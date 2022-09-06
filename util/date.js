export const getFormattedDate = (date) => {
    // const year = date.getFullYear();
    // const month = date.getMonth() + 1;
    // const day = date.getDate();
    return date.toISOString().slice(0, 10);
};

export const getDateMinusDays = (date, days) => {
    const newDate = new Date(date.getFullYear(), date.getMonth(), date.getDate() - days);
    return newDate;
};