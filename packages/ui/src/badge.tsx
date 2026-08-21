import type { HTMLAttributes } from "react";

export type BadgeVariant = "default" | "warning" | "muted";

const VARIANT_CLASSES: Record<BadgeVariant, string> = {
	default: "bg-emerald-500/15 text-emerald-300",
	warning: "bg-amber-500/15 text-amber-300",
	muted: "bg-zinc-700/40 text-zinc-400",
};

export interface BadgeProps extends HTMLAttributes<HTMLSpanElement> {
	variant?: BadgeVariant;
}

export function Badge({
	variant = "default",
	className = "",
	...props
}: BadgeProps) {
	return (
		<span
			className={`inline-flex shrink-0 items-center rounded-full px-2.5 py-0.5 font-medium text-xs ${VARIANT_CLASSES[variant]} ${className}`}
			{...props}
		/>
	);
}
