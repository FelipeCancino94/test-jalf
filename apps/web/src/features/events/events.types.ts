import { z } from "zod";

// ---------------------------------------------------------------------------
// Zod schemas — legacy REST response + server function inputs
// ---------------------------------------------------------------------------

// some legacy rows have quirky dates — fall back gracefully
// export const LegacyStartDateSchema = z.coerce.date().catch(() => new Date(0)); // ---> OLD FUNCTION 
export const LegacyStartDateSchema = z.string().transform((value, ctx) => {
	const date = /^\d+$/.test(value) ? new Date(Number(value) * 1000) : new Date(value);

	if (Number.isNaN(date.getTime())) {
		ctx.addIssue({ code: "custom", message: "Invalid legacy date" });
		return z.NEVER;
	}
	return date;
});

/** Raw legacy event: snake_case in, camelCase out. */
export const LegacyEventSchema = z
	.object({
		id: z.string(),
		title: z.string(),
		city: z.string(),
		description: z.string(),
		start_date: LegacyStartDateSchema,
		capacity: z.number().int(),
		attendee_count: z.number().int(),
		attending: z.boolean(),
	})
	.transform((row) => ({
		id: row.id,
		title: row.title,
		city: row.city,
		description: row.description,
		startDate: row.start_date,
		capacity: row.capacity,
		attendeeCount: row.attendee_count,
		attending: row.attending,
	}));

export type EventItem = z.output<typeof LegacyEventSchema>;

export const LegacyEventListSchema = z.array(LegacyEventSchema);

/** Input for fetchEventServerFn */
export const FetchEventInputSchema = z.object({
	eventId: z.string(),
});

// ---------------------------------------------------------------------------
// Error codes
// ---------------------------------------------------------------------------

export const EVENT_ERRORS = {
	FETCH_FAILED: "fetch_failed",
	PARSE_FAILED: "parse_failed",
	NOT_FOUND: "not_found",
} as const;

export type EventError = (typeof EVENT_ERRORS)[keyof typeof EVENT_ERRORS];

// ---------------------------------------------------------------------------
// View state
// ---------------------------------------------------------------------------

export type EventFilter = "upcoming" | "past" | "all";
