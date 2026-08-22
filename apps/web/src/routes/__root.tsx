import { QueryClientProvider } from "@tanstack/react-query";
import {
	createRootRoute,
	HeadContent,
	Link,
	Outlet,
	Scripts,
} from "@tanstack/react-router";
import { t } from "@/lib/messages";
import { queryClient } from "@/lib/query-client";
import appCss from "../index.css?url";

export const Route = createRootRoute({
	head: () => ({
		meta: [
			{ charSet: "utf-8" },
			{ name: "viewport", content: "width=device-width, initial-scale=1" },
			{ title: "Pulse" },
		],
		links: [{ rel: "stylesheet", href: appCss }],
	}),
	component: RootDocument,
});

function RootDocument() {
	return (
		<html lang="en" className="dark">
			<head>
				<HeadContent />
			</head>
			<body className="min-h-screen bg-zinc-950 text-zinc-100 antialiased">
				<QueryClientProvider client={queryClient}>
					<nav className="mx-auto flex max-w-2xl items-center gap-6 px-4 py-6">
						<span className="font-semibold text-indigo-400 text-lg">Pulse</span>
						<Link to="/" className="text-sm text-zinc-300 hover:text-white">
							{t("nav.home")}
						</Link>
						<Link to="/mine" className="text-sm text-zinc-300 hover:text-white">
							{t("nav.myRsvps")}
						</Link>
					</nav>
					<main className="mx-auto max-w-2xl px-4 pb-16">
						<Outlet />
					</main>
				</QueryClientProvider>
				<Scripts />
			</body>
		</html>
	);
}
