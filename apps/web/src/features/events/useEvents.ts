import { useQuery } from "@tanstack/react-query";
import { useMemo, useState } from "react";
import { fetchEventsServerFn } from "./events.fn";
import type { EventFilter, EventItem } from "./events.types";

export function useEvents() {
	const [filter, setFilter] = useState<EventFilter>("upcoming");

	const query = useQuery({
		queryKey: ["events"],
		queryFn: async (): Promise<EventItem[]> => {
			const response = await fetchEventsServerFn();
			if (!response.ok) {
				throw new Error(response.error);
			}
			return response.data;
		},
	});

	const allEvents = query.data;

	const events = useMemo(() => {
		if (!allEvents) {
			return [];
		}
		const now = Date.now();
		switch (filter) {
			case "upcoming":
				return allEvents.filter((event) => event.startDate.getTime() >= now);
			case "past":
				return allEvents.filter((event) => event.startDate.getTime() < now);
			case "all":
				return allEvents;
		}
	}, [allEvents, filter]);

	return {
		events,
		filter,
		setFilter,
		isLoading: query.isLoading,
		isError: query.isError,
	};
}
