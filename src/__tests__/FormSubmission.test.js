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
afterEach(() => server.resetHandlers());

test("login submission call the api (mock api) correctly", async () => {
  render(<LoginSubmission />);
  userEvent.type(screen.getByLabelText(/username/i), "alireza");
  userEvent.type(screen.getByLabelText(/password/i), "alireza123");
  userEvent.click(screen.getByRole("button", { name: /submit/i }));

  await waitForElementToBeRemoved(() => screen.queryByText(/loading/i));

  expect(screen.getByText("alireza")).toBeInTheDocument();
});

test("error message when password or username not provided", async () => {
  render(<LoginSubmission />);
  userEvent.type(screen.getByLabelText(/username/i), "alireza");
  userEvent.click(screen.getByRole("button", { name: /submit/i }));

  await waitForElementToBeRemoved(() => screen.queryByText(/loading/i));
  expect(screen.getByRole("alert").textContent).toMatchInlineSnapshot(
    `"password required"`
  );
});

test("some unexpected error happens testing", async () => {
  const errorMessage = "something went wrong";

  server.use(
    rest.post(
      "https://auth-provider.example.com/api/login",
      async (req, res, ctx) => {
        return res(ctx.status(500), ctx.json({ message: errorMessage }));
      }
    )
  );

  render(<LoginSubmission />);

  userEvent.click(screen.getByRole("button", { name: /submit/i }));

  await waitForElementToBeRemoved(() => screen.queryByText(/loading/i));

  expect(screen.getByRole("alert")).toHaveTextContent(errorMessage);
});
