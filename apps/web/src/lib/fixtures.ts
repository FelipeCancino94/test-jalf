// Raw event rows exactly as the legacy API stores them — snake_case fields,
// string dates. Dates are generated relative to module load so the board
// always shows a mix of upcoming and past events, whenever the exercise runs.

export interface LegacyEventRow {
	id: string;
	title: string;
	city: string;
	description: string;
	start_date: string;
	capacity: number;
	attendee_count: number;
}

const DAY_MS = 24 * 60 * 60 * 1000;

function startDate(daysFromNow: number): Date {
	const date = new Date(Date.now() + daysFromNow * DAY_MS);
	date.setHours(19, 0, 0, 0);
	return date;
}

/** ISO-8601 start date `daysFromNow` days out. */
function iso(daysFromNow: number): string {
	return startDate(daysFromNow).toISOString();
}

/** Epoch-seconds string — the format legacy v1 rows were migrated with. */
function epochSeconds(daysFromNow: number): string {
	return String(Math.floor(startDate(daysFromNow).getTime() / 1000));
}

export const EVENT_FIXTURES: LegacyEventRow[] = [
	{
		id: "evt-1",
		title: "Morning Trail Run",
		city: "Boulder",
		description:
			"An easy 8k on the Mesa Trail followed by coffee. All paces welcome.",
		start_date: iso(2),
		capacity: 24,
		attendee_count: 18,
	},
	{
		id: "evt-2",
		title: "Vinyl Listening Night",
		city: "Portland",
		description:
			"Bring one record, hear eleven others. Tube amps and comfy chairs provided.",
		// migrated from legacy v1 — epoch seconds
		start_date: epochSeconds(-3),
		capacity: 40,
		attendee_count: 31,
	},
	{
		id: "evt-3",
		title: "Intro to Ceramics",
		city: "Seattle",
		description:
			"Hands-on wheel-throwing basics. Clay, tools, and aprons included.",
		start_date: iso(5),
		capacity: 16,
		attendee_count: 9,
	},
	{
		id: "evt-4",
		title: "Sunset Rooftop Social",
		city: "Austin",
		description:
			"Casual drinks and skyline views. Come meet the neighbors before the heat breaks.",
		start_date: iso(7),
		capacity: 20,
		attendee_count: 19,
	},
	{
		id: "evt-5",
		title: "Board Game Marathon",
		city: "Denver",
		description:
			"From gateway games to heavy euros. Bring your favorite or learn a new one.",
		start_date: iso(10),
		capacity: 12,
		attendee_count: 8,
	},
	{
		id: "evt-6",
		title: "Street Food Crawl",
		city: "Chicago",
		description:
			"Five stops, four neighborhoods, one evening. Wear walking shoes and bring cash.",
		start_date: iso(14),
		capacity: 25,
		attendee_count: 14,
	},
	{
		id: "evt-7",
		title: "Tiny Concert: Strings",
		city: "Nashville",
		description:
			"A string quartet in a living room. Unamplified, unhurried, unforgettable.",
		start_date: iso(21),
		capacity: 30,
		attendee_count: 30,
	},
	{
		id: "evt-8",
		title: "Open Water Swim",
		city: "San Diego",
		description:
			"Guided 1.5k loop off La Jolla Cove. Wetsuits optional, buddy system required.",
		start_date: iso(30),
		capacity: 50,
		attendee_count: 22,
	},
	{
		id: "evt-9",
		title: "Letterpress Workshop",
		city: "Minneapolis",
		description:
			"Set type by hand and print your own poster on a restored Vandercook.",
		// migrated from legacy v1 — epoch seconds
		start_date: epochSeconds(-10),
		capacity: 15,
		attendee_count: 12,
	},
	{
		id: "evt-10",
		title: "Autumn Photography Walk",
		city: "Burlington",
		description:
			"Golden hour along the waterfront. Any camera counts, phones included.",
		start_date: iso(45),
		capacity: 18,
		attendee_count: 5,
	},
	{
		id: "evt-11",
		title: "Homebrew Tasting",
		city: "Sacramento",
		description:
			"Six members, six batches. Blind scoring, gentle feedback, decent snacks.",
		// migrated from legacy v1 — epoch seconds
		start_date: epochSeconds(-30),
		capacity: 20,
		attendee_count: 17,
	},
	{
		id: "evt-12",
		title: "New Year Potluck",
		city: "Madison",
		description:
			"The annual table-groaner. Sign up for a dish in the comments as usual.",
		start_date: iso(-60),
		capacity: 60,
		attendee_count: 48,
	},
];
