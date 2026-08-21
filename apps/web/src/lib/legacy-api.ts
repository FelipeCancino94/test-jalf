/**
 * Simulates the legacy Perl REST API. In the real product this is a remote
 * service we do not own — treat its shapes and quirks as fixed.
 *
 * RSVP state lives in this module and resets on server restart. Every call
 * carries a small artificial latency, like the real thing.
 */
import { EVENT_FIXTURES, type LegacyEventRow } from "./fixtures";

const SEEDED_RSVPS = ["evt-3"] as const;

const rsvps = new Set<string>(SEEDED_RSVPS);
const seeded = new Set<string>(SEEDED_RSVPS);

const LATENCY_MS = 120;

function sleep(ms: number): Promise<void> {
	return new Promise((resolve) => setTimeout(resolve, ms));
}

export interface LegacyEventResponse extends LegacyEventRow {
	/** Whether the current session member is attending. */
	attending: boolean;
}

export type LegacyRsvpResponse =
	| { ok: true }
	| { ok: false; error: "already_rsvpd" | "not_found" | "event_full" };

function toResponse(row: LegacyEventRow): LegacyEventResponse {
	const attending = rsvps.has(row.id);
	// Fixture counts already include the seeded RSVP; only live changes shift them.
	const adjustment = (attending ? 1 : 0) - (seeded.has(row.id) ? 1 : 0);
	return { ...row, attendee_count: row.attendee_count + adjustment, attending };
}

export async function legacyListEvents(): Promise<LegacyEventResponse[]> {
	await sleep(LATENCY_MS);
	return EVENT_FIXTURES.map(toResponse);
}

export async function legacyGetEvent(
	id: string,
): Promise<LegacyEventResponse | null> {
	await sleep(LATENCY_MS);
	const row = EVENT_FIXTURES.find((event) => event.id === id);
	return row ? toResponse(row) : null;
}

export async function legacyPostRsvp(id: string): Promise<LegacyRsvpResponse> {
	await sleep(LATENCY_MS);
	const row = EVENT_FIXTURES.find((event) => event.id === id);
	if (!row) {
		return { ok: false, error: "not_found" };
	}
	if (rsvps.has(id)) {
		return { ok: false, error: "already_rsvpd" };
	}
	if (toResponse(row).attendee_count >= row.capacity) {
		return { ok: false, error: "event_full" };
	}
	rsvps.add(id);
	return { ok: true };
}

export async function legacyDeleteRsvp(
	id: string,
): Promise<LegacyRsvpResponse> {
	await sleep(LATENCY_MS);
	if (!rsvps.has(id)) {
		return { ok: false, error: "not_found" };
	}
	rsvps.delete(id);
	return { ok: true };
}

export async function legacyMyRsvps(): Promise<LegacyEventResponse[]> {
	await sleep(LATENCY_MS);
	return EVENT_FIXTURES.filter((event) => rsvps.has(event.id)).map(toResponse);
}
