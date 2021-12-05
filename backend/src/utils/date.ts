import dayjs from "dayjs";

export const DATE_ONLY_FORMAT = "YYYY-MM-DD";

export function coerceDateOnlyStringToDate(str: string): Date {
    return dayjs.utc(str, DATE_ONLY_FORMAT, true).startOf("day").toDate();
}
