import type { ButtonHTMLAttributes } from "react";

export type ButtonVariant = "primary" | "ghost" | "danger";

const VARIANT_CLASSES: Record<ButtonVariant, string> = {
	primary:
		"bg-indigo-500 text-white hover:bg-indigo-400 disabled:bg-indigo-500/40",
	ghost:
		"bg-transparent text-zinc-300 hover:bg-zinc-800 disabled:text-zinc-600",
	danger: "bg-red-600 text-white hover:bg-red-500 disabled:bg-red-600/40",
};

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
	variant?: ButtonVariant;
}

export function Button({
	variant = "primary",
	className = "",
	type = "button",
	...props
}: ButtonProps) {
	return (
		<button
			type={type}
			className={`rounded-md px-3 py-1.5 font-medium text-sm transition-colors disabled:cursor-not-allowed ${VARIANT_CLASSES[variant]} ${className}`}
			{...props}
		/>
	);
}
