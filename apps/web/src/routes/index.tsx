import { createFileRoute } from "@tanstack/react-router";
import { EventsContainer } from "@/features/events/events.container";

export const Route = createFileRoute("/")({
	component: EventsContainer,
});
