# NOTES — judgment questions + timebox

Answer in 5–10 lines each. Specific and honest beats polished and generic.

## 1. What would you refactor first in this codebase, and why?

The isFull / spotsLeft logic. It's calculated inline inside EventCard, and when I built the /mine slice I found the exact same off-by-one bug copy-pasted there (spotsLeft <= 1). That's the giveaway: a business rule living in JSX will get duplicated and each copy will drift.

I'd pull it into a small model module — getSpotsLeft() clamped at zero and isEventFull() comparing === 0. An exact equality has no boundary to get wrong, so the whole category of bug goes away instead of just this instance. It also makes the rule testable without rendering anything.

## 2. The legacy API boundary

This app trusts a legacy REST API it doesn't own. What risks do you see at
that boundary, and how would you harden it?

The risk I actually hit is inside the data: start_date comes in two formats. Most rows are ISO-8601, but three of them are epoch-seconds migrated from legacy. A plain new Date() on those gives Invalid Date, which doesn't throw it just makes every date comparison return false, so those events silently vanish from both "upcoming" and "past" filters.

## 3. What was new to you?

Which part of this stack was newest to you, and what did you look up while
working?

TanStack Start's createServerFn, I'd used React Query plenty but not the server-function side, so I looked up how the handler and inputValidator fit together and how it splits client/server. neverthrow was the other one. I'd seen the Result pattern but not used it in anger, so I spent time on andThen vs map and on .match() to unwrap into the ActionResponse shape at the server-fn layer. 

I also looked up whether invalidateQueries refetches inactive queries. It doesn't by default, it marks them stale and they refetch on remount. That turned out to be the whole explanation for the stale badge on the home list.

## Timebox

Where did you stop, and what would you have done next?

Fixed the three bugs (the <= 1 badge, the filter reset effect, and the missing invalidateQueries after RSVP), each with a regression test, and built the /mine slice with its own legacy -> server fn -> hook chain.

I'd also namespace the query keys as ["events", "all"] and ["events", "mine"] so one prefix invalidation covers both lists, with two separate keys it's a matter of time before someone adds a third and forgets to invalidate it.
