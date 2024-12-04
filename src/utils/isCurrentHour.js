import moment from "moment";
export function isCurrentHour(timestamp) {
    const currentHourStart = moment().startOf('hour');
    const currentHourEnd = moment().endOf('hour');
    const providedTime = moment.unix(timestamp * 1); // Multiply by 1 to ensure it's a number.

    return providedTime.isBetween(currentHourStart, currentHourEnd, null, '[]');
}