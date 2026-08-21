const EVENT_DATE_FORMAT = new Intl.DateTimeFormat("en", {
	weekday: "short",
	month: "short",
	day: "numeric",
	year: "numeric",
	hour: "numeric",
	minute: "2-digit",
});

/** Shared event-date formatting — every date a member sees goes through here. */
export function formatEventDate(date: Date): string {
	return EVENT_DATE_FORMAT.format(date);
}
