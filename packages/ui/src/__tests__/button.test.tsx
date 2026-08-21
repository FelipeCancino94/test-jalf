import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";
import { Button } from "../button";

describe("Button", () => {
	it("renders its label", () => {
		render(<Button>RSVP</Button>);

		expect(screen.getByRole("button", { name: "RSVP" })).toBeInTheDocument();
	});

	it("fires onClick when clicked", async () => {
		const user = userEvent.setup();
		const onClick = vi.fn();
		render(<Button onClick={onClick}>RSVP</Button>);

		await user.click(screen.getByRole("button", { name: "RSVP" }));

		expect(onClick).toHaveBeenCalledTimes(1);
	});

	it("does not fire onClick when disabled", async () => {
		const user = userEvent.setup();
		const onClick = vi.fn();
		render(
			<Button onClick={onClick} disabled>
				RSVP
			</Button>,
		);

		await user.click(screen.getByRole("button", { name: "RSVP" }));

		expect(onClick).not.toHaveBeenCalled();
	});
});
