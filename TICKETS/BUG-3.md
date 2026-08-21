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

- **Observed:**
- **Hypothesis:**
- **Fix:**
