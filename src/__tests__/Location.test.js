import React from "react";
import { render, screen } from "@testing-library/react";
import Location from "../Location";
import { useCurrentPosition } from "react-use-geolocation";
import { act } from "react-dom/test-utils";

jest.mock("react-use-geolocation");

test("displays the user's current location", () => {
  const fakePosition = {
    coords: {
      latitude: 35,
      longitude: 139,
    },
  };

  let setReturnValue;
  function useMockCurrentPosition() {
    const state = React.useState([]);
    setReturnValue = state[1];
    return state[0];
  }

  useCurrentPosition.mockImplementation(useMockCurrentPosition);

  render(<Location />);
  expect(screen.getByText(/loading/i)).toBeInTheDocument();

  act(() => {
    setReturnValue([fakePosition]);
  });

  expect(screen.queryByText(/loading/i)).not.toBeInTheDocument();

  expect(screen.getByText(/latitude/i)).toHaveTextContent(
    `Latitude: ${fakePosition.coords.latitude}`
  );
});
