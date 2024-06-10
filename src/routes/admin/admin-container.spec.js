import React from "react";
import { render, screen } from "@testing-library/react";
import AdminContainer from "./admin-container.component";

test("renders admin-container component", () => {
  render(<AdminContainer />);
  const testTestId = screen.getByTestId("container-element");
  expect(testTestId).toBeInTheDocument();
});
