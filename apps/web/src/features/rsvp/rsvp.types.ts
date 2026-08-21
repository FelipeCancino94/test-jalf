import { z } from "zod";

/** Input for rsvpServerFn / cancelRsvpServerFn */
export const RsvpInputSchema = z.object({
	eventId: z.string(),
});

export const RSVP_ERRORS = {
	RSVP_FAILED: "rsvp_failed",
	ALREADY_RSVPD: "already_rsvpd",
	NOT_FOUND: "not_found",
	EVENT_FULL: "event_full",
} as const;

export type RsvpError = (typeof RSVP_ERRORS)[keyof typeof RSVP_ERRORS];
