import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";

dayjs.extend(utc);

export function formatValue<T>(val: T | null, formatter?: (val: T) => string) {
	if (val === null || (typeof val === "string" && !val.length)) {
		return "-";
	}
	if (formatter) {
		return formatter(val);
	}
	return val;
}

export function formatAge(dateOfBirth: string | Date | null) {
	if (!dateOfBirth) {
		return "-";
	}

	const now = dayjs.utc();
	const numMonths = now.diff(dayjs.utc(dateOfBirth), "month");

	if (numMonths < 1) {
		return "<1 month";
	}

	let str = "";

	const years = Math.floor(numMonths / 12);
	const months = numMonths % 12;

	if (years) {
		str += years;
		str += years === 1 ? " year" : " years";
	}

	if (months) {
		str += months;
		str += months === 1 ? " month" : " months";
	}

	return str;
}
