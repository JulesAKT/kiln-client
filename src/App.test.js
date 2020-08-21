import React from "react";

import App from "./App";
import Root from "./root";

import ReactDOM from "react-dom";

it("renders without crashing", () => {
  const div = document.createElement("div");
  ReactDOM.render(
    <Root>
      <App />
    </Root>,
    div
  );
  expect(div.innerHTML).toContain("ui container");

  ReactDOM.unmountComponentAtNode(div);
});
