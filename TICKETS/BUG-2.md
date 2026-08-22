# BUG-2 — Can't view past events

Priority: 2

## Report

From a member: "I can't look at past events. I tap **Past** and it flips
straight back to **Upcoming** every time. Same with **All**. Tried two
browsers, same thing."

## Acceptance

- Root cause fixed — all three filter tabs stay selected and show the right
  events.
- Regression test added that would have caught this.
- Investigation note appended below.

## Investigation note (yours)

3–5 sentences total:

- **Observed:** The change when I clicked the button to show the past events or all events not work, I see a little "jump" but it show the same content.
- **Hypothesis:** The value for the filter when change the value it's not working or the validations for show the filter is not correctly used, maybe the setFilter not change the value.
- **Fix:** The cause of the bug is for an useEffect in the file useEvents.ts, thishooks only set the (setFilter) to "upcoming" when the events or the filter values changes each time, When I change the filter value with the click event the useEffect detect the change and set again "upcoming" value to filter. I delete the useEffect because is not necessary to use because ethe value "upcoming" is the default value when the function is called.
