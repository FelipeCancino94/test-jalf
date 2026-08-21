/**
 * The unified result shape every server function returns.
 *
 *   ok: true  → { ok: true;  data: T }
 *   ok: false → { ok: false; error: E }
 *
 * E is the action-specific error union (e.g. "event_full").
 */
export type ActionResponse<T, E extends string = string> =
	| { ok: true; data: T }
	| { ok: false; error: E };
