import { createServerFn } from "@tanstack/react-start";
import type { ActionResponse } from "@/lib/action-types";
import type { EventError, EventItem } from "../events/events.types";
import { legacyFetchMyRsvps } from "./my-rsvps.legacy";

export const fetchMyRsvpsServerFn = createServerFn({ method: "GET" }).handler(
	async (): Promise<ActionResponse<EventItem[], EventError>> => {
		const result = await legacyFetchMyRsvps();
		return result.match(
			(events) => ({ ok: true as const, data: events }),
			(error) => ({ ok: false as const, error }),
		);
	},
);