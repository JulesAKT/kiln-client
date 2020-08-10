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
import ProjectList from "./components/ProjectList";
import ProjectShow from "./components/ProjectShow.js";
import ProjectCreate from "./components/ProjectCreate";
import ProjectEdit from "./components/ProjectEdit";
//import ProjectDelete from "./components/ProjectDelete";
import FiringShow from "./components/FiringShow";
import FiringEdit from "./components/FiringEdit";
//import FiringDelete from "./components/FiringDelete";
import FiringCreate from "./components/FiringCreate";
import KilnsList from "./components/KilnsList";
import KilnCreate from "./components/KilnCreate.js";
import KilnShow from "./components/KilnShow";
import KilnEdit from "./components/KilnEdit";
//import KilnDelete from "./components/KilnDelete";
import alertActions from "./actions/alertActions";

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
                <PrivateRoute path="/" exact component={ProjectList} />
                <PrivateRoute
                  path="/projects/:id"
                  exact
                  component={ProjectShow}
                />
                <PrivateRoute
                  path="/new_project"
                  exact
                  component={ProjectCreate}
                />
                <PrivateRoute
                  path="/projects/edit/:id"
                  exact
                  component={ProjectEdit}
                />
                <PrivateRoute
                  path="/firings/:id"
                  exact
                  component={FiringShow}
                />
                <PrivateRoute
                  path="/new_firing"
                  exact
                  component={FiringCreate}
                />
                <PrivateRoute
                  path="/firings/edit/:id"
                  exact
                  component={FiringEdit}
                />
                <PrivateRoute path="/kilns" exact component={KilnsList} />
                <PrivateRoute path="/new_kiln" exact component={KilnCreate} />
                <PrivateRoute path="/kilns/:id" exact component={KilnShow} />
                <PrivateRoute
                  path="/kilns/edit/:id"
                  exact
                  component={KilnEdit}
                />
              </Switch>
            </DndProvider>
          </div>
        </Router>
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
