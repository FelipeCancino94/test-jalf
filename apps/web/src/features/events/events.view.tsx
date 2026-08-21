import { Badge, Button, Card, Skeleton } from "@pulse/ui";
import { Link } from "@tanstack/react-router";
import type { ReactNode } from "react";
import { formatEventDate } from "@/lib/format";
import { t } from "@/lib/messages";
import type { EventFilter, EventItem } from "./events.types";

const FILTERS: EventFilter[] = ["upcoming", "past", "all"];

const FILTER_LABELS: Record<EventFilter, string> = {
	upcoming: t("events.filter.upcoming"),
	past: t("events.filter.past"),
	all: t("events.filter.all"),
};

const SKELETON_KEYS = ["sk-1", "sk-2", "sk-3", "sk-4"];

export interface EventsViewProps {
	events: EventItem[];
	filter: EventFilter;
	onFilterChange: (filter: EventFilter) => void;
	isLoading: boolean;
	isError: boolean;
}

export function EventsView({
	events,
	filter,
	onFilterChange,
	isLoading,
	isError,
}: EventsViewProps) {
	let content: ReactNode;
	if (isError) {
		content = <p className="text-red-400">{t("common.error")}</p>;
	} else if (isLoading) {
		content = (
			<div className="flex flex-col gap-3">
				{SKELETON_KEYS.map((key) => (
					<Skeleton
						key={key}
						className="h-28 w-full"
						data-testid="event-skeleton"
					/>
				))}
			</div>
		);
	} else {
		content = (
			<ul className="flex flex-col gap-3">
				{events.map((event) => (
					<EventCard key={event.id} event={event} />
				))}
			</ul>
		);
	}

	return (
		<section className="flex flex-col gap-6">
			<h1 className="font-semibold text-2xl">{t("events.title")}</h1>
			<div className="flex gap-2">
				{FILTERS.map((value) => (
					<Button
						key={value}
						variant={filter === value ? "primary" : "ghost"}
						onClick={() => onFilterChange(value)}
					>
						{FILTER_LABELS[value]}
					</Button>
				))}
			</div>
			{content}
		</section>
	);
}

function EventCard({ event }: { event: EventItem }) {
	const spotsLeft = event.capacity - event.attendeeCount;
	// An event with no spots left is full.
	const isFull = spotsLeft <= 1;

	return (
		<li>
			<Link
				to="/event/$eventId"
				params={{ eventId: event.id }}
				className="block"
			>
				<Card className="transition-colors hover:border-zinc-700">
					<div className="flex items-start justify-between gap-4">
						<div>
							<h2 className="font-medium text-lg">{event.title}</h2>
							<p className="text-sm text-zinc-400">
								{event.city} · {formatEventDate(event.startDate)}
							</p>
							<p className="mt-2 text-sm text-zinc-500">
								{t("event.attendees", { count: event.attendeeCount })}
							</p>
						</div>
						{isFull ? (
							<Badge variant="warning">{t("events.full")}</Badge>
						) : (
							<Badge>{t("events.spotsLeft", { count: spotsLeft })}</Badge>
						)}
					</div>
				</Card>
			</Link>
		</li>
	);
}
