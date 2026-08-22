import { err, ok, ResultAsync } from "neverthrow";
import { legacyMyRsvps } from "@/lib/legacy-api";
import {
	EVENT_ERRORS,
	type EventError,
	type EventItem,
	LegacyEventListSchema,
} from "../events/events.types";

export function legacyFetchMyRsvps(): ResultAsync<EventItem[], EventError> {
	return ResultAsync.fromPromise(
		legacyMyRsvps(),
		() => EVENT_ERRORS.FETCH_FAILED,
	).andThen((rows) => {
		const parsed = LegacyEventListSchema.safeParse(rows);
		return parsed.success ? ok(parsed.data) : err(EVENT_ERRORS.PARSE_FAILED);
	});
}