import { cleanup } from "@testing-library/react";
import { afterEach, vi } from "vitest";
import "@testing-library/jest-dom/vitest";

// TanStack Start server-fn machinery — chainable noops, handler returns the
// inner fn so tests can call server functions directly.
vi.mock("@tanstack/react-start", () => ({
	createServerFn: vi.fn(() => ({
		inputValidator: vi.fn().mockReturnThis(),
		handler: vi.fn((fn: (...args: unknown[]) => unknown) => fn),
	})),
}));

// TanStack Router — typed Links render as plain anchors; override individual
// exports per-test via `vi.mocked(...)`, or re-declare the whole module mock
// at file scope.
vi.mock("@tanstack/react-router", async () => {
	const React = await import("react");
	type LinkProps = {
		to?: string;
		children?: React.ReactNode;
	} & Record<string, unknown>;
	const Link = ({
		to,
		children,
		params: _params,
		search: _search,
		...props
	}: LinkProps) =>
		React.createElement("a", { href: to ?? "#", ...props }, children);
	return {
		Link,
		Outlet: () => null,
		useNavigate: vi.fn(() => vi.fn()),
		useParams: vi.fn(() => ({})),
		createFileRoute: vi.fn(() => () => ({})),
		createRootRoute: vi.fn(() => ({})),
	};
});

afterEach(() => {
	cleanup();
	vi.clearAllMocks();
});
