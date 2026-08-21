# Pulse — take-home exercise

## What this is

Pulse is a small events/RSVP board written in the style of our production
codebase: TanStack Start + React Query on Bun, feature slices, a legacy REST
boundary we do not own. You will fix bugs, build one feature, and answer three
short questions.

Work the tickets in `TICKETS/`. Everything you need is in this repo.

## Setup

Requires **Bun ≥ 1.3** (https://bun.sh).

```sh
bun install
bun run dev        # → http://localhost:3001
```

**First step after install:**

```sh
git init && git add -A && git commit -m "chore: initial import"
```

Note: RSVP state is held in memory by the fake legacy API and resets whenever
the dev server restarts. That is expected.

## Rules

1. **Timebox: 3–4 hours.** When you hit it, stop, and note where you stopped
   in `TICKETS/NOTES.md`.
2. **Work in priority order:** BUG-1 → BUG-2 → BUG-3 → FEATURE-1 → BUG-4
   (stretch) → NOTES.md. Three things done well beat six done sloppily.
3. **One commit per ticket**, Conventional Commits format, ticket ID in the
   subject — e.g. `fix(events): correct spots-left threshold [BUG-1]`.
4. **Run tests with `bun run test`** — NOT `bun test` (Bun's built-in runner
   will choke on Vitest imports).
5. **Do not modify anything under `apps/web/src/lib/` or `packages/ui/`.**
   They simulate systems you don't own (the legacy API, the shared design
   system). If you believe a fix belongs there, write that in NOTES.md
   instead of making it.
6. **Every bug fix must fix the root cause** and include a regression test
   that would have caught it.
7. **Append an investigation note** to each bug ticket you work on (template
   is inside each ticket).
8. **No AI coding assistants for this exercise.** We discuss your code
   together afterward, and we're hiring your judgment, not your tooling.
9. **Submit the whole folder, including `.git`.**

## Codebase tour

- Features live in `apps/web/src/features/<name>/` as slices:
  `<name>.types.ts` (Zod schemas + errors), `<name>.legacy.ts` (REST boundary,
  neverthrow), `<name>.fn.ts` (server functions returning `ActionResponse`),
  `use<Name>.ts` (hook), `<name>.view.tsx` (pure view),
  `<name>.container.tsx` (wiring), `__tests__/`.
- `apps/web/src/lib/` holds the fake legacy API, fixtures, message catalog
  (`t()` + `en.json`), shared date formatting, and the query client.
- `packages/ui` is the shared design system (`@pulse/ui`).
- UI copy goes through `t("some.key")`; dates through `formatEventDate`.
- This is simplified from production — the real stack adds i18n compilation,
  oRPC, and observability — but the conventions are the same.

## What we look at

- **Debugging:** how you found the cause, not just that the symptom went away.
- **Fit with conventions:** your feature slice should look like it grew here.
- **Care with instructions:** the rules above are all checkable; we check.
- **Curiosity:** honest, specific answers in NOTES.md land better than polish.
