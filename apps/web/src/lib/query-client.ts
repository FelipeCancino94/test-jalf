import { QueryClient } from "@tanstack/react-query";

// Shared cache tuning. Freshly fetched data is served from cache for five
// minutes — anything that changes server state is expected to invalidate the
// query keys it affects.
export const queryClient = new QueryClient({
	defaultOptions: {
		queries: {
			staleTime: 5 * 60_000,
			refetchOnWindowFocus: false,
		},
	},
});
