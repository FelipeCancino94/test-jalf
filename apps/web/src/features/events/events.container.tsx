import { EventsView } from "./events.view";
import { useEvents } from "./useEvents";

export function EventsContainer() {
	const { events, filter, setFilter, isLoading, isError } = useEvents();

	return (
		<EventsView
			events={events}
			filter={filter}
			onFilterChange={setFilter}
			isLoading={isLoading}
			isError={isError}
		/>
	);
}
