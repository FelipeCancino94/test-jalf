import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { renderHook, waitFor } from "@testing-library/react";
import { createElement, type ReactNode } from "react";
import { beforeEach, describe, expect, it, vi } from "vitest";

// ---------------------------------------------------------------------------
// Mocks — declared before importing the hook
// ---------------------------------------------------------------------------

vi.mock("../events.fn", () => ({
	fetchEventsServerFn: vi.fn(),
	fetchEventServerFn: vi.fn(),
}));

import { fetchEventsServerFn } from "../events.fn";
import type { EventItem } from "../events.types";
import { useEvents } from "../useEvents";

const mockFetchEventsServerFn = vi.mocked(fetchEventsServerFn);

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

const FIXTURES: EventItem[] = [
	makeEvent({ id: "evt-up-1", startDate: new Date(Date.now() + 2 * DAY_MS) }),
	makeEvent({ id: "evt-up-2", startDate: new Date(Date.now() + 9 * DAY_MS) }),
	makeEvent({ id: "evt-past-1", startDate: new Date(Date.now() - 5 * DAY_MS) }),
];

function makeWrapper() {
	const queryClient = new QueryClient({
		defaultOptions: { queries: { retry: false } },
	});
	return ({ children }: { children: ReactNode }) =>
		createElement(QueryClientProvider, { client: queryClient }, children);
}

beforeEach(() => {
	mockFetchEventsServerFn.mockResolvedValue({
		ok: true as const,
		data: FIXTURES,
	});
});

// ---------------------------------------------------------------------------
// Loading data
// ---------------------------------------------------------------------------

describe("useEvents — data", () => {
	it("loads events from the server fn", async () => {
		const { result } = renderHook(() => useEvents(), {
			wrapper: makeWrapper(),
		});

		expect(result.current.isLoading).toBe(true);

		await waitFor(() => {
			expect(result.current.isLoading).toBe(false);
		});

		expect(mockFetchEventsServerFn).toHaveBeenCalledTimes(1);
		expect(result.current.events.length).toBeGreaterThan(0);
	});
});

// ---------------------------------------------------------------------------
// Default filter
// ---------------------------------------------------------------------------

describe("useEvents — filter", () => {
	it("defaults to the upcoming filter", () => {
		const { result } = renderHook(() => useEvents(), {
			wrapper: makeWrapper(),
		});

		expect(result.current.filter).toBe("upcoming");
	});

	it("only returns upcoming events under the default filter", async () => {
		const { result } = renderHook(() => useEvents(), {
			wrapper: makeWrapper(),
		});

		await waitFor(() => {
			expect(result.current.events.length).toBeGreaterThan(0);
		});

		const ids = result.current.events.map((event) => event.id);
		expect(ids).toEqual(["evt-up-1", "evt-up-2"]);
	});
});
