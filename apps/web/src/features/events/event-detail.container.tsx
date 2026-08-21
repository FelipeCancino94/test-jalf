import { useRsvp } from "@/features/rsvp/useRsvp";
import { EventDetailView } from "./event-detail.view";
import { useEventDetail } from "./useEventDetail";

export interface EventDetailContainerProps {
	eventId: string;
}

export function EventDetailContainer({ eventId }: EventDetailContainerProps) {
	const { event, isLoading, isError } = useEventDetail(eventId);
	const { rsvp, cancel, isMutating } = useRsvp(eventId);

	return (
		<EventDetailView
			event={event}
			isLoading={isLoading}
			isError={isError}
			isMutating={isMutating}
			onRsvp={rsvp}
			onCancel={cancel}
		/>
	);
}
