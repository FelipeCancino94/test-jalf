import { createServerFn } from "@tanstack/react-start";
import type { ActionResponse } from "@/lib/action-types";
import { legacyFetchEvent, legacyFetchEvents } from "./events.legacy";
import {
	type EventError,
	type EventItem,
	FetchEventInputSchema,
} from "./events.types";

/** Fetch every event on the board. */
export const fetchEventsServerFn = createServerFn({ method: "GET" }).handler(
	async (): Promise<ActionResponse<EventItem[], EventError>> => {
		const result = await legacyFetchEvents();
		return result.match(
			(events) => ({ ok: true as const, data: events }),
			(error) => ({ ok: false as const, error }),
		);
	},
);

/** Fetch a single event by id. */
export const fetchEventServerFn = createServerFn({ method: "GET" })
	.inputValidator(FetchEventInputSchema)
	.handler(async ({ data }): Promise<ActionResponse<EventItem, EventError>> => {
		const result = await legacyFetchEvent(data.eventId);
		return result.match(
			(event) => ({ ok: true as const, data: event }),
			(error) => ({ ok: false as const, error }),
		);
	});
