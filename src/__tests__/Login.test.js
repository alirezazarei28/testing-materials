import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import React from "react";
import Login from "../Login";

test("submitting the form call submit with username and password", () => {
  const handleSubmit = jest.fn();
  render(<Login onSubmit={handleSubmit} />);
  userEvent.type(screen.getByLabelText(/username/i), "alireza");
  userEvent.type(screen.getByLabelText(/password/i), "alireza123");
  userEvent.click(screen.getByRole("button", { name: /submit/i }));
  expect(handleSubmit).toHaveBeenCalledWith({
    username: "alireza",
    password: "alireza123",
  });

  expect(handleSubmit).toHaveBeenCalledTimes(1);
});
