import { useMyRsvps } from "./useMyRsvps";
import { MyRsvpsView } from "./my-rsvps.view";

export function MyRsvpsContainer() {
	const { events, isLoading, isError } = useMyRsvps();
  
    return (
      <MyRsvpsView
        events={events}
        isLoading={isLoading}
        isError={isError}
      />
    );
}