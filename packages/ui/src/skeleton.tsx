import type { HTMLAttributes } from "react";

/** Pulse-animated placeholder block. Size it with `className`. */
export function Skeleton({
	className = "",
	...props
}: HTMLAttributes<HTMLDivElement>) {
	return (
		<div
			className={`animate-pulse rounded-md bg-zinc-800 ${className}`}
			{...props}
		/>
	);
}
