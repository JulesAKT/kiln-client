import React from "react";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import { connect } from "react-redux";
import { Route, Router, Switch } from "react-router-dom";
import PrivateRoute from "./helpers/PrivateRoute";
import history from "./history";
import Header from "./components/Header";
import LoginPage from "./components/LoginPage";
import SignupPage from "./components/SignupPage";
import SignedupPage from "./components/SignedupPage";
import ProjectListPage from "./components/ProjectListPage";
import ProjectShowPage from "./components/ProjectShowPage.js";
import ProjectCreatePage from "./components/ProjectCreatePage";
import ProjectEditPage from "./components/ProjectEditPage";
import ProjectDeletePage from "./components/ProjectDeletePage";
import FiringShowPage from "./components/FiringShowPage";
import FiringEditPage from "./components/FiringEditPage";
import FiringDeletePage from "./components/FiringDeletePage";
import FiringCreatePage from "./components/FiringCreatePage";
import FiringFavouriteCreatePage from "./components/FiringFavouriteCreatePage";
import FiringFavouriteCopyConfirmPage from "./components/FiringFavouriteCopyConfirmPage";
import FiringTemplateCopyConfirmPage from "./components/FiringTemplateCopyConfirmPage";
import FiringExportPage from "./components/FiringExportPage";
import KilnsListPage from "./components/KilnsListPage";
import KilnCreatePage from "./components/KilnCreatePage.js";
import KilnShowPage from "./components/KilnShowPage";
import KilnEditPage from "./components/KilnEditPage";
import KilnDeletePage from "./components/KilnDeletePage";
import SegmentCreatePage from "./components/SegmentCreatePage";
import SegmentEditPage from "./components/SegmentEditPage";
import PrivacyPage from "./components/PrivacyPage";
import SupportPage from "./components/SupportPage";
import SegmentDeletePage from "./components/SegmentDeletePage";
import PreferencePage from "./components/PreferencePage";
import SuperUserPage from "./components/SuperUserPage";
import FavouriteFiringsListPage from "./components/FavouriteFiringsListPage";
import PhotoDeletePage from "./components/PhotoDeletePage";
import alertActions from "./actions/alertActions";
import { AuthProvider } from "./helpers/Auth";
import "semantic-ui-css/semantic.min.css";

class App extends React.Component {
  constructor(props) {
    super(props);
    history.listen((location, action) => {
      // Clear alerts if we change location
      this.props.clearAlerts();
    });
  }
  render() {
    const { alert } = this.props;
    return (
      <div className="ui container">
        <AuthProvider>
          <Router history={history}>
            <Header />
            {alert && alert.message && (
              <div className={`ui ${alert.type} message `}>{alert.message}</div>
            )}
            <div>
              <DndProvider backend={HTML5Backend}>
                <Switch>
                  <Route path="/login" exact component={LoginPage} />
                  <Route path="/signup" exact component={SignupPage} />
                  <Route path="/signedup" exact component={SignedupPage} />
                  <Route path="/privacy" exact component={PrivacyPage} />
                  <Route path="/support" exact component={SupportPage} />
                  <PrivateRoute path="/" exact component={ProjectListPage} />
                  <PrivateRoute
                    path="/projects/:id"
                    exact
                    component={ProjectShowPage}
                  />
                  <PrivateRoute
                    path="/new_project"
                    exact
                    component={ProjectCreatePage}
                  />
                  <PrivateRoute
                    path="/projects/edit/:id"
                    exact
                    component={ProjectEditPage}
                  />
                  <PrivateRoute
                    path="/projects/delete/:id"
                    exact
                    component={ProjectDeletePage}
                  />
                  <PrivateRoute
                    path="/projects/delete_photo/:id/:index"
                    exact
                    component={PhotoDeletePage}
                  />
                  <PrivateRoute
                    path="/firings/:id"
                    exact
                    component={FiringShowPage}
                  />
                  <PrivateRoute
                    path="/new_firing/:id/:order"
                    exact
                    component={FiringCreatePage}
                  />
                  <PrivateRoute
                    path="/new_favourite_firing/:id"
                    exact
                    component={FiringFavouriteCreatePage}
                  />

                  <PrivateRoute
                    path="/copy_favourite_firing_confirm/:project_id/:firing_id"
                    exact
                    component={FiringFavouriteCopyConfirmPage}
                  />
                  <PrivateRoute
                    path="/copy_template_firing_confirm/:project_id/:firing_id/:glass_type"
                    exact
                    component={FiringTemplateCopyConfirmPage}
                  />

                  <PrivateRoute
                    path="/firing/delete/:id"
                    exact
                    component={FiringDeletePage}
                  />
                  <PrivateRoute
                    path="/firing/export/:kiln/:id"
                    exact
                    component={FiringExportPage}
                  />
                  <PrivateRoute
                    path="/firings/edit/:id"
                    exact
                    component={FiringEditPage}
                  />
                  <PrivateRoute path="/kilns" exact component={KilnsListPage} />
                  <PrivateRoute
                    path="/new_kiln"
                    exact
                    component={KilnCreatePage}
                  />
                  <PrivateRoute
                    path="/kilns/:id"
                    exact
                    component={KilnShowPage}
                  />
                  <PrivateRoute
                    path="/kilns/edit/:id"
                    exact
                    component={KilnEditPage}
                  />
                  <PrivateRoute
                    path="/kilns/delete/:id"
                    exact
                    component={KilnDeletePage}
                  />
                  <PrivateRoute
                    path="/new_segment/:id/:order"
                    exact
                    component={SegmentCreatePage}
                  />
                  <PrivateRoute
                    path="/segments/edit/:id"
                    exact
                    component={SegmentEditPage}
                  />
                  <PrivateRoute
                    path="/segments/delete/:id"
                    exact
                    component={SegmentDeletePage}
                  />
                  <PrivateRoute
                    path="/preferences"
                    exact
                    component={PreferencePage}
                  />
                  <PrivateRoute
                    path="/superuser"
                    exact
                    component={SuperUserPage}
                  />

                  <PrivateRoute
                    path="/favourite_firings"
                    exact
                    component={FavouriteFiringsListPage}
                  />
                </Switch>
              </DndProvider>
            </div>
          </Router>
        </AuthProvider>
      </div>
    );
  }
}

function mapStateToProps(state) {
  const { alert } = state;
  return { alert };
}
const clearAlerts = alertActions.clear;

export default connect(mapStateToProps, { clearAlerts })(App);

/* 

                <PrivateRoute
                  path="/projects/delete/:id"
                  exact
                  component={ProjectDelete}
                />
                <PrivateRoute
                  path="/firings/delete/:id"
                  exact
                  component={FiringDelete}
                />
                <PrivateRoute
                  path="/kilns/delete/:id"
                  exact
                  component={KilnDelete}
                />
*/
