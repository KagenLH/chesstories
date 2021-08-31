export const normalizeDate = (date) => {
    const month = date.month;
    const day = date.day;
    const year  = date.year;

    const newDate = new Date(Date.UTC(year, month, day));
    const string = newDate.toLocaleString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });
    if(string !== "Invalid Date") return string;
    else return `${month}/${day}/${year}`
};