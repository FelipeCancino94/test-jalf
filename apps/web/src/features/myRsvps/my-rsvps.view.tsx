import { Badge, Card, Skeleton } from "@pulse/ui";
import { Link } from "@tanstack/react-router";
import type { ReactNode } from "react";
import { formatEventDate } from "@/lib/format";
import { t } from "@/lib/messages";
import type { EventItem } from "../events/events.types";

const SKELETON_KEYS = ["sk-1", "sk-2", "sk-3", "sk-4"];

export interface MyRsvpsViewProps {
  events: EventItem[];
  isLoading: boolean;
  isError: boolean;
}

export function MyRsvpsView({
  events,
  isLoading,
  isError,
}: MyRsvpsViewProps) {
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
        {
          events.length > 0 ?
            events.map((event) => (
              <EventCard key={event.id} event={event} />
            )) :
          <li>
            <span>{t("mine.empty")}</span>
            <span className="block"><Link to="/" className="underline">{ t("mine.browseCta") }</Link></span>
          </li>
        }
      </ul>
    );
  }

  return (
    <section className="flex flex-col gap-6">
      <h1 className="font-semibold text-2xl">{t("mine.title")}</h1>
      {content}
    </section>
  );
}

function EventCard({ event }: { event: EventItem }) {
  const spotsLeft = event.capacity - event.attendeeCount;
  const isFull = spotsLeft <= 0;

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
