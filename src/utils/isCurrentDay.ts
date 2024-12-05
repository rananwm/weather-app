import moment from "moment";
export function isCurrentDay(timestamp) {
    const currentDayStart = moment().startOf('day');
    const currentDayEnd = moment().endOf('day');
    const providedTime = moment.unix(timestamp * 1); // Multiply by 1 to ensure it's a number.

    return providedTime.isBetween(currentDayStart, currentDayEnd, null, '[]');
}
