import { render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import type { EventItem } from "../events.types";
import { EventsView, type EventsViewProps } from "../events.view";

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

const DAY_MS = 24 * 60 * 60 * 1000;

function makeEvent(overrides: Partial<EventItem> = {}): EventItem {
	return {
		id: "evt-test-1",
		title: "Test Event",
		city: "Testville",
		description: "A test event.",
		startDate: new Date(Date.now() + 3 * DAY_MS),
		capacity: 20,
		attendeeCount: 10,
		attending: false,
		...overrides,
	};
}

function makeProps(overrides: Partial<EventsViewProps> = {}): EventsViewProps {
	return {
		events: [makeEvent()],
		filter: "upcoming",
		onFilterChange: vi.fn(),
		isLoading: false,
		isError: false,
		...overrides,
	};
}

// ---------------------------------------------------------------------------
// Event cards
// ---------------------------------------------------------------------------

describe("EventsView — event cards", () => {
	it("renders a card per event with title and city", () => {
		const events = [
			makeEvent({
				id: "evt-test-1",
				title: "Morning Trail Run",
				city: "Boulder",
			}),
			makeEvent({
				id: "evt-test-2",
				title: "Board Game Marathon",
				city: "Denver",
			}),
		];
		render(<EventsView {...makeProps({ events })} />);

		expect(screen.getByText("Morning Trail Run")).toBeInTheDocument();
		expect(screen.getByText("Board Game Marathon")).toBeInTheDocument();
		expect(screen.getByText(/Boulder/)).toBeInTheDocument();
		expect(screen.getByText(/Denver/)).toBeInTheDocument();
	});

	it("shows the Full badge when no spots remain", () => {
		const events = [makeEvent({ capacity: 20, attendeeCount: 20 })];
		render(<EventsView {...makeProps({ events })} />);

		expect(screen.getByText("Full")).toBeInTheDocument();
		expect(screen.queryByText(/spots left/)).not.toBeInTheDocument();
	});

	it("shows the spots-left count when spots remain", () => {
		const events = [makeEvent({ capacity: 20, attendeeCount: 17 })];
		render(<EventsView {...makeProps({ events })} />);

		expect(screen.getByText("3 spots left")).toBeInTheDocument();
		expect(screen.queryByText("Full")).not.toBeInTheDocument();
	});

	// --------------------------
	// Regression test for: BUG-1
	// --------------------------
	it("show the last spot available when exactly one spot remains", () => {
		const events = [makeEvent({ capacity: 20, attendeeCount: 19 })];
		render(<EventsView {...makeProps({ events })} />);

		expect(screen.getByText("1 spot left")).toBeInTheDocument();
		expect(screen.queryByText("Full")).not.toBeInTheDocument();
	});
});

// ---------------------------------------------------------------------------
// Loading state
// ---------------------------------------------------------------------------

describe("EventsView — loading", () => {
	it("renders skeletons while loading", () => {
		render(<EventsView {...makeProps({ events: [], isLoading: true })} />);

		expect(screen.getAllByTestId("event-skeleton").length).toBeGreaterThan(0);
	});
});

// ---------------------------------------------------------------------------
// Error state
// ---------------------------------------------------------------------------

describe("EventsView — error", () => {
	it("renders the error message", () => {
		render(<EventsView {...makeProps({ events: [], isError: true })} />);

		expect(
			screen.getByText("Something went wrong. Try again."),
		).toBeInTheDocument();
	});
});
