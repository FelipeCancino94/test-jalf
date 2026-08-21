import { errAsync, okAsync } from "neverthrow";
import { beforeEach, describe, expect, it, vi } from "vitest";

// ---------------------------------------------------------------------------
// Mocks — declared before importing the module under test
// ---------------------------------------------------------------------------

vi.mock("../rsvp.legacy", () => ({
	legacyRsvp: vi.fn(),
	legacyCancelRsvp: vi.fn(),
}));

import { cancelRsvpServerFn, rsvpServerFn } from "../rsvp.fn";
import { legacyCancelRsvp, legacyRsvp } from "../rsvp.legacy";
import { RSVP_ERRORS } from "../rsvp.types";

const mockLegacyRsvp = vi.mocked(legacyRsvp);
const mockLegacyCancelRsvp = vi.mocked(legacyCancelRsvp);

function makeInput(eventId = "evt-1") {
	return { data: { eventId } };
}

beforeEach(() => {
	mockLegacyRsvp.mockReturnValue(okAsync(undefined));
	mockLegacyCancelRsvp.mockReturnValue(okAsync(undefined));
});

// ---------------------------------------------------------------------------
// rsvpServerFn
// ---------------------------------------------------------------------------

describe("rsvpServerFn — success", () => {
	it("returns ok and forwards the event id to the legacy layer", async () => {
		const response = await rsvpServerFn(makeInput("evt-5"));

		expect(response).toEqual({ ok: true, data: undefined });
		expect(mockLegacyRsvp).toHaveBeenCalledWith("evt-5");
	});
});

describe("rsvpServerFn — event full", () => {
	it("surfaces the event_full error", async () => {
		mockLegacyRsvp.mockReturnValue(errAsync(RSVP_ERRORS.EVENT_FULL));

		const response = await rsvpServerFn(makeInput("evt-7"));

		expect(response).toEqual({ ok: false, error: "event_full" });
	});
});

// ---------------------------------------------------------------------------
// cancelRsvpServerFn
// ---------------------------------------------------------------------------

describe("cancelRsvpServerFn — success", () => {
	it("returns ok and forwards the event id to the legacy layer", async () => {
		const response = await cancelRsvpServerFn(makeInput("evt-3"));

		expect(response).toEqual({ ok: true, data: undefined });
		expect(mockLegacyCancelRsvp).toHaveBeenCalledWith("evt-3");
	});
});
