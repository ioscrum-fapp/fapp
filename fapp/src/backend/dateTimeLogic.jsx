const monthNames = [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
];

function GetOrdinalIndicator(number) {
    const lastDigit = number % 10;
    const lastTwoDigits = number % 100;

    if (lastTwoDigits >= 11 && lastTwoDigits <= 13)
        return 'th';
    if (lastDigit === 1)
        return 'st';
    if (lastDigit === 2)
        return 'nd';
    if (lastDigit === 3)
        return 'rd';

    return 'th';
}

export function DateTimeToHumanReadableFormatTime(date) {
    const hours = date.getHours();
    const minutes = date.getMinutes();
    const meridiem = hours <= 12 ? "AM" : "PM";

    return `${hours % 12}:${minutes} ${meridiem}`;
}

export function DateTimeToHumanReadableFormatDate(date) {
    const year = date.getFullYear();
    const month = monthNames[date.getMonth()];
    const day = date.getDate();
    const ordinal = GetOrdinalIndicator(day);

    return `${month} ${day}${ordinal} ${year}`;
}

export default function DateTimeToHumanReadableFormatDateTime(date) {
    return `${DateTimeToHumanReadableFormatDate(date)} ${DateTimeToHumanReadableFormatTime(date)}`;
}

export function DateTimeToJsFormat(date) {
    return date.toISOString().split(".")[0];
}