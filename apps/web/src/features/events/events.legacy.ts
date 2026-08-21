import { err, ok, ResultAsync } from "neverthrow";
import { legacyGetEvent, legacyListEvents } from "@/lib/legacy-api";
import {
	EVENT_ERRORS,
	type EventError,
	type EventItem,
	LegacyEventListSchema,
	LegacyEventSchema,
} from "./events.types";

/**
 * Legacy REST boundary for events. Responses are validated here so the rest
 * of the app only ever sees parsed, camelCase `EventItem`s.
 */

export function legacyFetchEvents(): ResultAsync<EventItem[], EventError> {
	return ResultAsync.fromPromise(
		legacyListEvents(),
		() => EVENT_ERRORS.FETCH_FAILED,
	).andThen((rows) => {
		const parsed = LegacyEventListSchema.safeParse(rows);
		return parsed.success ? ok(parsed.data) : err(EVENT_ERRORS.PARSE_FAILED);
	});
}

export function legacyFetchEvent(
	eventId: string,
): ResultAsync<EventItem, EventError> {
	return ResultAsync.fromPromise(
		legacyGetEvent(eventId),
		() => EVENT_ERRORS.FETCH_FAILED,
	).andThen((row) => {
		if (row === null) {
			return err(EVENT_ERRORS.NOT_FOUND);
		}
		const parsed = LegacyEventSchema.safeParse(row);
		return parsed.success ? ok(parsed.data) : err(EVENT_ERRORS.PARSE_FAILED);
	});
}
