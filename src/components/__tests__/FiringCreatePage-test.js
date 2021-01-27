import React from "react";
import Root from "../../root";
import FiringCreatePage from "../FiringCreatePage";

import { waitForElement, render } from "@testing-library/react";

it("FiringCreatePage should render against a snapshot", async () => {
  const { container } = render(
    <Root>
      <FiringCreatePage match={{ params: { id: "2" } }} />
    </Root>
  );
  expect(container).toMatchSnapshot();
});
