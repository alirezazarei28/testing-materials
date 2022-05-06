import { render as rtlRender } from "@testing-library/react";
import React from "react";
import { ThemeProvider } from "./theme";

function render(ui, { theme = "light", ...options } = {}) {
  const wrapper = ({ children }) => (
    <ThemeProvider initialTheme={theme}>{children}</ThemeProvider>
  );
  return rtlRender(ui, { wrapper, ...options });
}

export * from "@testing-library/react";

// overriding react-testing-library render method
export { render };
