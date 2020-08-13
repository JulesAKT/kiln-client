import React, { Component } from "react";
import { connect } from "react-redux";
import { fetchKiln, deleteKiln, fetchProjectsByKiln } from "../actions";
import { Button } from "semantic-ui-react";
import Modal from "../Modal";
import history from "../history";
import _ from "lodash";

class KilnDelete extends Component {
  componentDidMount() {
    this.props.fetchKiln(this.props.match.params.id);
    this.props.fetchProjectsByKiln(this.props.match.params.id);
  }

  actions = () => (
    <React.Fragment>
      {console.log(this.props.projects.length !== 0)}
      <Button
        negative
        disabled={this.props.projects.length !== 0}
        onClick={() => {
          if (this.props.projects.length === 0) {
            this.props.deleteKiln(this.props.match.params.id);
          }
        }}
      >
        Delete
      </Button>
      <Button onClick={() => history.goBack()}>Cancel</Button>
    </React.Fragment>
  );

  renderContent() {
    if (!this.props.kiln || !this.props.projects) {
      return <div>Loading...</div>;
    }
    if (this.props.projects.length !== 0) {
      return (
        <div>
          There are projects that still refer to this Kiln. You can't delete the
          Kiln without first deleting or editing any projects that refer to it.
        </div>
      );
    }

    return (
      <React.Fragment>
        <div>Name:{this.props.kiln.name}</div>
      </React.Fragment>
    );
  }

  render() {
    return (
      <Modal
        title="Delete Kiln"
        content={this.renderContent()}
        actions={this.actions()}
        onDismiss={() => history.goBack()}
      />
    );
  }
}

const mapStateToProps = (state, ownProps) => {
  return {
    kiln: state.kilns[ownProps.match.params.id], // Pull just the stream I care about.
    projects: _.filter(
      state.projects,
      (project) => project.kiln === ownProps.match.params.id
    ),
  };
};

export default connect(mapStateToProps, {
  fetchKiln,
  fetchProjectsByKiln,
  deleteKiln,
})(KilnDelete);
