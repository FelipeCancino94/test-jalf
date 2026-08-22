import { useQuery } from "@tanstack/react-query";
import type { EventItem } from "../events/events.types";
import { fetchMyRsvpsServerFn } from "./my-rsvps.fn";

export function useMyRsvps() {
	const query = useQuery({
		queryKey: ["my-rsvps"],
		queryFn: async (): Promise<EventItem[]> => {
			const response = await fetchMyRsvpsServerFn();
			if (!response.ok) {
				throw new Error(response.error);
			}
			return response.data;
		},
	});

	return {
		events: query.data ?? [],
		isLoading: query.isLoading,
		isError: query.isError,
	};
}