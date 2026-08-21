import en from "./messages/en.json";

export type MessageKey = keyof typeof en;

/**
 * Minimal typed message lookup. The production stack compiles translations;
 * here a single English catalog with `{param}` interpolation is enough.
 */
export function t(
	key: MessageKey,
	params?: Record<string, string | number>,
): string {
	const template: string = en[key];
	if (!params) {
		return template;
	}
	return template.replace(/\{(\w+)\}/g, (match, name: string) =>
		Object.hasOwn(params, name) ? String(params[name]) : match,
	);
}
