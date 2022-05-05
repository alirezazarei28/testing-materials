import { render, screen } from "@testing-library/react";
import React from "react";
import Counter from "../Counter";
import userEvent from "@testing-library/user-event";

test("Counter works properly", () => {
  render(<Counter />);

  const inc = screen.getByRole("button", { name: /increment/i });
  const dec = screen.getByRole("button", { name: /decrement/i });
  const message = screen.getByText(/current count/i);

  expect(message).toHaveTextContent(/current count: 0/i);
  userEvent.click(inc);
  expect(message).toHaveTextContent(/current count: 1/i);
  userEvent.click(dec);
  expect(message).toHaveTextContent(/current count: 0/i);
});
