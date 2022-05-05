import {
  render,
  screen,
  waitForElementToBeRemoved,
} from "@testing-library/react";
import React from "react";
import LoginSubmission from "../LoginSubmission";
import userEvent from "@testing-library/user-event";
import { rest } from "msw";
import { setupServer } from "msw/node";

const server = setupServer(
  rest.post(
    "https://auth-provider.example.com/api/login",
    async (req, res, ctx) => {
      if (!req.body.password) {
        return res(ctx.status(400), ctx.json({ message: "password required" }));
      }
      if (!req.body.username) {
        return res(ctx.status(400), ctx.json({ message: "username required" }));
      }
      return res(ctx.json({ username: req.body.username }));
    }
  )
);

beforeAll(() => server.listen());
afterAll(() => server.close());

test("login submission call the api (mock api) correctly", async () => {
  render(<LoginSubmission />);
  userEvent.type(screen.getByLabelText(/username/i), "alireza");
  userEvent.type(screen.getByLabelText(/password/i), "alireza123");
  userEvent.click(screen.getByRole("button", { name: /submit/i }));

  await waitForElementToBeRemoved(() => screen.queryByText(/loading/i));

  expect(screen.getByText("alireza")).toBeInTheDocument();
});
