import "@testing-library/jest-dom";
import { Router } from "react-router-dom";
import { render } from "@testing-library/react";
import { createMemoryHistory } from "history";
import "jest-styled-components";

export function renderWithRouter(
  ui,
  { history = createMemoryHistory(), ...renderOptions } = {}
) {
  function Wrapper({ children }) {
    return <Router history={history}>{children}</Router>;
  }

  return { ...render(ui, { wrapper: Wrapper, ...renderOptions }) };
}
