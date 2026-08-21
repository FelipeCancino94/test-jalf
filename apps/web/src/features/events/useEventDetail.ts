import { useQuery } from "@tanstack/react-query";
import { fetchEventServerFn } from "./events.fn";
import type { EventItem } from "./events.types";

export function useEventDetail(eventId: string) {
	const query = useQuery({
		queryKey: ["event", eventId],
		queryFn: async (): Promise<EventItem> => {
			const response = await fetchEventServerFn({ data: { eventId } });
			if (!response.ok) {
				throw new Error(response.error);
			}
			return response.data;
		},
	});

	return {
		event: query.data,
		isLoading: query.isLoading,
		isError: query.isError,
	};
}
