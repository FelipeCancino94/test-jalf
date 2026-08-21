import { Badge, Button, Card, Skeleton, Spinner } from "@pulse/ui";
import { Link } from "@tanstack/react-router";
import { formatEventDate } from "@/lib/format";
import { t } from "@/lib/messages";
import type { EventItem } from "./events.types";

export interface EventDetailViewProps {
	event: EventItem | undefined;
	isLoading: boolean;
	isError: boolean;
	isMutating: boolean;
	onRsvp: () => void;
	onCancel: () => void;
}

export function EventDetailView({
	event,
	isLoading,
	isError,
	isMutating,
	onRsvp,
	onCancel,
}: EventDetailViewProps) {
	if (isError) {
		return <p className="text-red-400">{t("common.error")}</p>;
	}
	if (isLoading || !event) {
		return <Skeleton className="h-64 w-full" />;
	}

	const isFull = event.attendeeCount >= event.capacity;
	const spotsLeft = event.capacity - event.attendeeCount;

	return (
		<div className="flex flex-col gap-4">
			<Link to="/" className="text-sm text-zinc-400 hover:text-zinc-200">
				← {t("nav.home")}
			</Link>
			<Card>
				<div className="flex flex-col gap-4">
					<div className="flex items-start justify-between gap-4">
						<div>
							<h1 className="font-semibold text-2xl">{event.title}</h1>
							<p className="text-sm text-zinc-400">
								{event.city} · {formatEventDate(event.startDate)}
							</p>
						</div>
						{isFull ? (
							<Badge variant="warning">{t("events.full")}</Badge>
						) : (
							<Badge>{t("events.spotsLeft", { count: spotsLeft })}</Badge>
						)}
					</div>
					<p className="text-zinc-300">{event.description}</p>
					<p className="text-sm text-zinc-500">
						{t("event.attendees", { count: event.attendeeCount })}
					</p>
					<div className="flex items-center gap-3">
						{event.attending ? (
							<Button variant="danger" onClick={onCancel} disabled={isMutating}>
								{t("event.cancelRsvp")}
							</Button>
						) : (
							<Button onClick={onRsvp} disabled={isFull || isMutating}>
								{t("event.rsvp")}
							</Button>
						)}
						{isMutating ? <Spinner /> : null}
					</div>
				</div>
			</Card>
		</div>
	);
}
