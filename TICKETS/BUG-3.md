# BUG-3 — Home list shows stale spots after RSVP

Priority: 3

## Report

From a member: "I RSVP'd from an event's page — it worked, the page showed
me as going. Then I went back to the home list and it still showed the old
number of spots. Only a full page reload fixed it."

## Acceptance

- Root cause fixed — after an RSVP or a cancel, every view of that event
  shows correct numbers without a reload.
- Regression test added that would have caught this.
- Investigation note appended below.

## Investigation note (yours)

3–5 sentences total:

- **Observed:** When I click in RSVP or a cancel the badge counter of spots left change only in the event detail, the badge in the list of events not change, only changes when I reload the page, the status of button change correctly between the rsvp and the cancel state, the list of events and the event details are in separate statements (Not connected by props).
- **Hypothesis:** The section of event list is saved in cache but in rsvp or cancel function the cache for the section of event list is not cleaned, try to force the cache cleaning fix the bug.
- **Fix:** Add the function invalidateQueries of queryClient to refresh the cache of events data.
