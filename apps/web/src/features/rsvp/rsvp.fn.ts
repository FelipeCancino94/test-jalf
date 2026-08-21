import { createServerFn } from "@tanstack/react-start";
import type { ActionResponse } from "@/lib/action-types";
import { legacyCancelRsvp, legacyRsvp } from "./rsvp.legacy";
import { type RsvpError, RsvpInputSchema } from "./rsvp.types";

/** RSVP the current member to an event. */
export const rsvpServerFn = createServerFn({ method: "POST" })
	.inputValidator(RsvpInputSchema)
	.handler(async ({ data }): Promise<ActionResponse<undefined, RsvpError>> => {
		const result = await legacyRsvp(data.eventId);
		return result.match(
			() => ({ ok: true as const, data: undefined }),
			(error) => ({ ok: false as const, error }),
		);
	});

/** Cancel the current member's RSVP for an event. */
export const cancelRsvpServerFn = createServerFn({ method: "POST" })
	.inputValidator(RsvpInputSchema)
	.handler(async ({ data }): Promise<ActionResponse<undefined, RsvpError>> => {
		const result = await legacyCancelRsvp(data.eventId);
		return result.match(
			() => ({ ok: true as const, data: undefined }),
			(error) => ({ ok: false as const, error }),
		);
	});
