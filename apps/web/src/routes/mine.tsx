import { createFileRoute } from '@tanstack/react-router';
import { MyRsvpsContainer } from '@/features/myRsvps/my-rsvps.container';

export const Route = createFileRoute('/mine')({
  component: MyRsvpsContainer,
})
