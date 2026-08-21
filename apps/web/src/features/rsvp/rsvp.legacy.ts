import { err, ok, ResultAsync } from "neverthrow";
import { legacyDeleteRsvp, legacyPostRsvp } from "@/lib/legacy-api";
import { RSVP_ERRORS, type RsvpError } from "./rsvp.types";

function mapLegacyError(
	error: "already_rsvpd" | "not_found" | "event_full",
): RsvpError {
	switch (error) {
		case "already_rsvpd":
			return RSVP_ERRORS.ALREADY_RSVPD;
		case "not_found":
			return RSVP_ERRORS.NOT_FOUND;
		case "event_full":
			return RSVP_ERRORS.EVENT_FULL;
	}
}

export function legacyRsvp(eventId: string): ResultAsync<undefined, RsvpError> {
	return ResultAsync.fromPromise(
		legacyPostRsvp(eventId),
		() => RSVP_ERRORS.RSVP_FAILED,
	).andThen((response) =>
		response.ok ? ok(undefined) : err(mapLegacyError(response.error)),
	);
}

export function legacyCancelRsvp(
	eventId: string,
): ResultAsync<undefined, RsvpError> {
	return ResultAsync.fromPromise(
		legacyDeleteRsvp(eventId),
		() => RSVP_ERRORS.RSVP_FAILED,
	).andThen((response) =>
		response.ok ? ok(undefined) : err(mapLegacyError(response.error)),
	);
}
