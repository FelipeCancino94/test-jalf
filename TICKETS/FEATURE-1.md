# FEATURE-1 — "My RSVPs" page

Priority: after BUG-3, before BUG-4.

A member wants one place to see everything they've RSVP'd to.

## Requirements

1. New route **`/mine`** listing the events the member has RSVP'd to. Server
   data comes from `legacyMyRsvps()` in `apps/web/src/lib/legacy-api.ts` —
   build your own feature slice on top of it; do not modify `lib/`.
2. Nav link in the root layout, using the existing `nav.myRsvps` message key.
3. Loading state reuses `Skeleton` from `@pulse/ui`.
4. Empty state shows the `mine.empty` message with a `mine.browseCta` link
   back to `/`.
5. Each row shows the event title, city, and date via the shared date
   formatter, plus a **Cancel RSVP** button. Rows sort soonest-first, with
   past events greyed out (muted `Past` badge) and grouped after the upcoming
   ones. Cancelling removes the row, and the home-page counts must be correct
   afterward without a reload.
6. Follow the feature-slice pattern used by `features/events/` — the
   types/legacy/fn/hook/view/container split — including `__tests__/` for the
   hook and the view.

**Out of scope:** do NOT add pagination, search, or filters.
