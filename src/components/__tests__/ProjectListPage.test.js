import React from "react";

import ProjectListPage from "../ProjectListPage";
import Root from "../../root";
import { AuthProvider } from "../../helpers/Auth";
import { waitForElement, render } from "@testing-library/react";
import { Router } from "react-router-dom";
import history from "../../history";
import {
  createProject,
  deleteProject,
  createKiln,
  deleteKiln,
} from "../../actions";

beforeEach(() => {
  async () => {
    await createKiln({ name: "Test Kiln", id: "test-kiln-id" });
    console.log("Calling createproject");
    await createProject({
      name: "Test",
      id: "test-id",
      kiln_id: "test-kiln-id",
    });
  };
});

it("renders without crashing", async () => {
  const { getByText } = render(
    <Root>
      <AuthProvider>
        <Router history={history}>
          <ProjectListPage />
        </Router>
      </AuthProvider>
    </Root>
  );

  await waitForElement((content) => getByText(/Add New Project/));
  expect(getByText(/Add New Project/));
});

afterEach(() => {
  //  deleteProject("test-id");
});
