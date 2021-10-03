export const monthsConverter = (months: number | null | undefined): string => {
	if (!months) return "-";
	return `${(months / 12) | 0} years ${months % 12} months`;
};
