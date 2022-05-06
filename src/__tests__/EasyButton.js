import React from "react";
import EasyButton from "../EasyButton";
import { render, screen } from "../test-utils";

test("renders with the light styles for the light theme", () => {
  render(<EasyButton>Easy</EasyButton>);
  const button = screen.getByRole("button", { name: /easy/i });
  expect(button).toHaveStyle(`
    background-color: white;
    color: black;
`);
});

test("renders with the dark styles for the dark theme", () => {
  render(<EasyButton>Easy</EasyButton>, { theme: "dark" });
  const button = screen.getByRole("button", { name: /easy/i });
  expect(button).toHaveStyle(`
    color: white;
    background-color: black;
`);
});
