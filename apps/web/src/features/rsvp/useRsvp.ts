import { useMutation, useQueryClient } from "@tanstack/react-query";
import { cancelRsvpServerFn, rsvpServerFn } from "./rsvp.fn";

export function useRsvp(eventId: string) {
	const queryClient = useQueryClient();

	// refresh event data after RSVP
	const invalidateEventQueries = () => {
		queryClient.invalidateQueries({ queryKey: ["event", eventId] });
		queryClient.invalidateQueries({ queryKey: ["events"] });
	};

	const rsvpMutation = useMutation({
		mutationFn: async () => {
			const response = await rsvpServerFn({ data: { eventId } });
			if (!response.ok) {
				throw new Error(response.error);
			}
		},
		onSuccess: invalidateEventQueries,
	});

	const cancelMutation = useMutation({
		mutationFn: async () => {
			const response = await cancelRsvpServerFn({ data: { eventId } });
			if (!response.ok) {
				throw new Error(response.error);
			}
		},
		onSuccess: invalidateEventQueries,
	});

	return {
		rsvp: () => rsvpMutation.mutate(),
		cancel: () => cancelMutation.mutate(),
		isMutating: rsvpMutation.isPending || cancelMutation.isPending,
	};
}
