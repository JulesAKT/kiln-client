import React from "react";

import App from "./App";
import Root from "./root";

import ReactDOM from "react-dom";
import { act } from "react-dom/test-utils";
import { waitForElement, render } from "@testing-library/react";

it("renders without crashing", async () => {
  const { getByText } = render(
    <Root>
      <App />
    </Root>
  );

  await waitForElement((content) => getByText(/Projects/));
  expect(getByText(/Projects/));
});
