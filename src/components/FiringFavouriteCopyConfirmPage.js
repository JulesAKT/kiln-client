import React from "react";
import { useDispatch } from "react-redux";
import { Button, Grid, Table } from "semantic-ui-react";
import uuid from "react-uuid";
import _ from "lodash";

import { createFiring, createSegment } from "../actions";
import Modal from "../Modal";
import FiringGraph from "./FiringGraph";
import history from "../history";
import useFirebaseFiring from "../hooks/useFirebaseFiring";
import useFirebaseSegments from "../hooks/useFirebaseSegments";
import useFirebaseProject from "../hooks/useFirebaseProject";

const FiringFavouriteCopyConfirmPage = (props) => {
  const project_id = props.match.params.project_id;
  const firing_id = props.match.params.firing_id;
  const project = useFirebaseProject(project_id);
  const firing = useFirebaseFiring(firing_id);
  const segments = useFirebaseSegments();
  const my_segments = _.filter(
    segments,
    (segment) => segment.firing_id === firing_id
  );
  const sorted_segments_array = Object.values(my_segments).sort((a, b) => {
    return a.order > b.order ? 1 : -1;
  });

  const dispatch = useDispatch();

  const copyFavourite = (destination_project_id) => {
    const my_firing = { ...firing };
    console.log("New Firing");
    console.log(my_firing);
    my_firing.favourite = false;
    const new_id = uuid();
    my_firing.id = new_id;
    my_firing.project_id = destination_project_id;
    my_segments.forEach((segment) => {
      const new_segment = { ...segment };
      new_segment.id = uuid();
      new_segment.firing_id = new_id;
      dispatch(createSegment(new_segment, false));
    });

    dispatch(createFiring(my_firing, true));
  };

  const renderContent = () => (
    <Grid>
      <Grid.Column width="6">
        <FiringGraph
          sortedSegments={sorted_segments_array}
          showAnnotations={false}
        />
      </Grid.Column>
      <Grid.Column width="10">
        {" "}
        <Table>
          <Table.Header>
            <Table.Row>
              <Table.HeaderCell>Name</Table.HeaderCell>
              <Table.HeaderCell>Rate</Table.HeaderCell>
              <Table.HeaderCell>Temperature</Table.HeaderCell>
              <Table.HeaderCell>Hold</Table.HeaderCell>
            </Table.Row>
          </Table.Header>
          {sorted_segments_array.map((segment, index) => (
            <Table.Row>
              <Table.Cell>{segment.name}</Table.Cell>
              <Table.Cell>{segment.rate}</Table.Cell>
              <Table.Cell>{segment.temperature}</Table.Cell>
              <Table.Cell>{segment.hold}</Table.Cell>
            </Table.Row>
          ))}
        </Table>
      </Grid.Column>
    </Grid>
  );
  const actions = () => (
    <>
      {" "}
      <Button
        disabled={my_segments.length === 0}
        onClick={() => {
          if (segments.length !== 0) {
            copyFavourite(project_id);
          }
        }}
      >
        Confirm
      </Button>
      <Button onClick={() => history.goBack()}>Cancel</Button>
    </>
  );

  if (!project || !firing || !my_segments) {
    return <div>Loading...</div>;
  }
  return (
    <Modal
      onDismiss={() => history.goBack()}
      title={"Copy Firing:" + firing.name}
      actions={actions()}
      content={renderContent()}
    />
  );
};

export default FiringFavouriteCopyConfirmPage;
