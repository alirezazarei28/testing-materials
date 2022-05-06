import useCounter from "../useCounter";
import { renderHook, act } from "@testing-library/react-hooks";

test("useCounter exposes count and increment/decrement functions", () => {
  const { result, rerender } = renderHook(useCounter, {
    initialProps: { initialCount: 10 },
  });
  expect(result.current.count).toBe(10);

  act(() => result.current.increment());
  expect(result.current.count).toBe(11);

  rerender({ step: 3 });
  act(() => result.current.decrement());
  expect(result.current.count).toBe(8);
});
