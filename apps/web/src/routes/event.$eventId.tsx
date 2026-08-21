import { createFileRoute } from "@tanstack/react-router";
import { EventDetailContainer } from "@/features/events/event-detail.container";

export const Route = createFileRoute("/event/$eventId")({
	component: EventDetailPage,
});

function EventDetailPage() {
	const { eventId } = Route.useParams();
	return <EventDetailContainer eventId={eventId} />;
}
