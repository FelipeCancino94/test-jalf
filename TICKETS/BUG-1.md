# BUG-1 — "Full" on the board, but she could RSVP

Priority: 1 (start here)

## Report

From support: "Member says the 'Sunset Rooftop Social' event shows **Full**
on the events board, but when she opens it she can still RSVP — and it
worked. Which is right? She got in, but another member saw Full and gave up."

## Acceptance

- Root cause fixed — the board and the event page agree.
- Regression test added that would have caught this.
- Investigation note appended below.

## Investigation note (yours)

3–5 sentences total:

- **Observed:** The Badge in card list shows "Full" when remains 1 spot for the event, in the event details show it the badge show 1 spots left and the RSVP button enable, inconsistencies in the badge information between the event card badge and the detail event badge and show it in event detail the badge 1 spots left have an error of pluralize text when is only 1 spot (singular).
- **Hypothesis:** Error in function to get the remaining spots avaibale or error in validation for the full badge
- **Fix:** In events.view.tsx I change the validation spotsLeft <= 1 to spotsLeft <= 0, the bug show the "Full" badge information because the validation include the 1 remaining spot like a "Full" event, the change fix that to show the correctly remaining spot and I add a singular text for show correctly the "1 spot left" text.
