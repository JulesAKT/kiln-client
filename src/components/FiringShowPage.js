import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";

import { Button, Icon, Segment, Header, Table, Ref } from "semantic-ui-react";
import { kilnIsExportable } from "../helpers/exportHelpers";
import { decodeScaryURLQueryParameter } from "../helpers/shareHelpers";
import FiringGraph from "./FiringGraph";

import {
  fetchFiring,
  fetchPreferences,
  fetchProjects,
  fetchKilns,
  fetchSegmentsByFiring,
  fetchSharedSegmentsByFiring,
  fetchSharedFiring,
  fetchSharedProjects,
  editFiring,
  editSegment,
} from "../actions";

import { convertDegreesInSegment, degreeText } from "../helpers/unitHelpers";
import { convertSegmentsToTimedController } from "../helpers/timedController";

import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import _ from "lodash";
import { isThisTypeNode } from "typescript";

class FiringShowPage extends Component {
  componentDidMount() {
    const params = this.props.match.params;
    this.props.dispatch(fetchPreferences());
    if (params.id) {
      this.props.dispatch(fetchSegmentsByFiring(params.id));
      this.props.dispatch(fetchFiring(params.id));
      this.props.dispatch(fetchProjects());
      this.props.dispatch(fetchKilns());
    } else {
      this.props.dispatch(
        fetchSharedSegmentsByFiring(
          params.sharing_user_id,
          params.shared_firing_id
        )
      );
      this.props.dispatch(
        fetchSharedFiring(params.sharing_user_id, params.shared_firing_id)
      );
      this.props.dispatch(fetchSharedProjects(params.sharing_user_id));
    }
  }
  render() {
    const id = this.props.match.params.id;
    const preferences = this.props.preferences;
    const projects = this.props.projects;

    let firings, firing, segments, project, kiln;

    const searchParams = new URLSearchParams(this.props.location.search);
    const shared_project_payload = searchParams.get("p");
    if (id) {
      //console.log("Not Shared");
      segments = this.props.segments;
      project = projects[firing?.project_id];
      kiln = this.props.kilns[project?.kiln];
      firing = this.props.firing;
    } else {
      console.log("NOT SHARED PROCESSING");
      let firings_array, all_segments;
      segments = this.props.shared_segments;
      firing = this.props.shared_firing;
      project = this.props.shared_projects?.[firing?.project_id];
      //console.log(segments);
      /*       segments = segments_array.reduce(
        (o, segment) => ({
          ...o,
          [segment.id]: segment,
        }),
        {}
      ); */
      kiln = {};
      //console.log(segments);
    }
    //console.log(firing);
    //console.log(segments);

    const readOnly = !!shared_project_payload;
    const degrees =
      preferences && preferences.degrees
        ? preferences && preferences.degrees
        : "celsius";
    if (!firing) {
      return <div>Loading...</div>;
    }

    const reorderSegments = (data) => {
      data.forEach((element, index) => {
        if (element.order !== index) {
          console.log("Changed entry: " + index);
          element.order = index;
          this.props.dispatch(editSegment(data[index].id, element, false));
        }
      });
    };

    const correct_degrees_segments = segments.map((segment) =>
      convertDegreesInSegment(segment, degrees)
    );
    const segments_array = Object.values(correct_degrees_segments);

    const sorted_segments_array = segments_array.sort((a, b) => {
      return a.order > b.order ? 1 : -1;
    });

    //const graph_segments_array = sorted_segments_array;
    const controller_sensitive_segments = convertSegmentsToTimedController(
      sorted_segments_array,
      kiln
    );

    const renderDeleteIcon = () => {
      if (segments_array.length === 0 && !readOnly) {
        return (
          <span>
            <Link to={`/firing/delete/${id}`}>
              <Icon name="trash" type="feather" />
            </Link>
          </span>
        );
      } else {
        return <Icon name="trash" type="feather" disabled floated="right" />;
      }
    };

    const renderHeader = () => {
      return (
        <Header as="h3" attached="top">
          <Link to={`/firings/edit/${id}`}>
            <Icon name="edit" type="feather" floated="left" />
          </Link>
          <Header.Content>
            <>
              {firing.name}
              {firing.notes && <div>Notes: {firing.notes}</div>}
              {firing.date && (
                <div>Firing Date: {new Date(firing.date).toDateString()}</div>
              )}
            </>
          </Header.Content>

          {renderDeleteIcon()}
        </Header>
      );
    };

    const renderFavouriteButton = () => {
      if (!firing.favourite) {
        return (
          <Button
            onClick={() => {
              firing.favourite = true;
              this.props.dispatch(editFiring(id, firing, false));
            }}
            disabled={readOnly}
          >
            Mark as Favourite
          </Button>
        );
      } else {
        return (
          <Button
            onClick={() => {
              firing.favourite = false;
              this.props.dispatch(editFiring(id, firing, false));
            }}
            disabled={readOnly}
          >
            Unmark as Favourite
          </Button>
        );
      }
    };
    const grid = 8;
    const getItemStyle = (isDragging, draggableStyle) => ({
      // some basic styles to make the items look a bit nicer
      userSelect: "none",
      padding: grid * 2,
      margin: `0 0 ${grid}px 0`,

      // change background colour if dragging
      background: isDragging ? "lightgreen" : "white",

      // styles we need to apply on draggables
      ...draggableStyle,
    });
    const getListStyle = (isDraggingOver) => ({
      background: isDraggingOver ? "lightblue" : "lightgrey",
      padding: grid,
      width: 250,
    });
    const reorderList = (list, startIndex, endIndex) => {
      const result = Array.from(list);
      //      console.log(result);
      const [removed] = result.splice(startIndex, 1);
      // console.log(removed);
      // console.log(result);
      result.splice(endIndex, 0, removed);
      //  console.log(result);
      return result;
    };

    const onDragEnd = (result) => {
      if (!result.destination || readOnly) {
        return;
      }
      console.log(
        `Item ${result.source.index} went to position ${result.destination.index}`
      );
      const new_sorted_segments = reorderList(
        sorted_segments_array,
        result.source.index,
        result.destination.index
      );
      reorderSegments(new_sorted_segments);

      // Rest of Drop implementation hnere
    };
    return (
      <DragDropContext onDragEnd={onDragEnd}>
        <div>
          {renderHeader()}
          <Segment attached>
            <Table>
              <Table.Header>
                <Table.Row>
                  <Table.HeaderCell>Name</Table.HeaderCell>
                  <Table.HeaderCell>{`Rate (${degreeText(
                    degrees
                  )}/hr)`}</Table.HeaderCell>
                  <Table.HeaderCell>
                    {kiln?.timed_controller
                      ? `Time (hh:mm)`
                      : `Temperature (${degreeText(degrees)})`}
                  </Table.HeaderCell>
                  <Table.HeaderCell>Hold (mins)</Table.HeaderCell>
                  <Table.HeaderCell>Actions</Table.HeaderCell>
                  <Table.HeaderCell>Move</Table.HeaderCell>
                </Table.Row>
              </Table.Header>
              <Droppable droppableId="segments_table">
                {(provided, snapshot) => (
                  <Ref innerRef={provided.innerRef}>
                    <Table.Body
                      {...provided.droppableProps}
                      style={getListStyle(snapshot.isDraggingOver)}
                    >
                      {controller_sensitive_segments.map((segment, index) => {
                        //console.log(segment);
                        return (
                          <Draggable
                            key={segment.id}
                            draggableId={segment.id}
                            index={index}
                          >
                            {(provided, snapshot) => (
                              <Ref innerRef={provided.innerRef}>
                                <Table.Row
                                  {...provided.draggableProps}
                                  {...provided.dragHandleProps}
                                  style={getItemStyle(
                                    snapshot.isDraggingOver,
                                    provided.draggableProps.style
                                  )}
                                >
                                  <Table.Cell>{segment.name}</Table.Cell>
                                  <Table.Cell>{segment.rate}</Table.Cell>
                                  <Table.Cell>{segment.temperature}</Table.Cell>
                                  <Table.Cell>{segment.hold}</Table.Cell>
                                  <Table.Cell>
                                    <Link to={`/segments/edit/${segment.id}`}>
                                      <Icon name="edit" type="feather" />
                                    </Link>
                                    <Link to={`/segments/delete/${segment.id}`}>
                                      <Icon name="trash" type="feather" />
                                    </Link>
                                  </Table.Cell>
                                  <Table.Cell>
                                    <Icon name="bars" />
                                  </Table.Cell>
                                </Table.Row>
                              </Ref>
                            )}
                          </Draggable>
                        );
                      })}
                      {provided.placeholder}
                    </Table.Body>
                  </Ref>
                )}
              </Droppable>
            </Table>
            {!readOnly && (
              <Link
                to={`/new_segment/${id}/${
                  Math.max(...sorted_segments_array.map((s) => s.order), 0) + 1
                }`}
              >
                <Icon name="add" />
                Add Segment
              </Link>
            )}
          </Segment>

          {renderFavouriteButton()}
          {kilnIsExportable(kiln) && !readOnly && (
            <Link to={`/firing/export/${kiln.id}/${id}/`}>
              <Button>Export Firing</Button>
            </Link>
          )}
        </div>
        {sorted_segments_array.length !== 0 && (
          <FiringGraph
            sortedSegments={sorted_segments_array}
            degrees={degrees}
            project={project}
          />
        )}
      </DragDropContext>
    );
  }
}

const mapStateToProps = (state, ownProps) => {
  console.log(state);
  const stateProps = {
    segments: _.filter(state.segments, (segment) => {
      return segment.firing_id === ownProps.match.params.id;
    }),
    firing: state.firings[ownProps.match.params.id],
    preferences: state.preferences,
    projects: state.projects,
    kilns: state.kilns,
    shared_projects:
      state.shared_projects[ownProps.match.params.sharing_user_id],
    shared_segments: _.filter(
      state.shared_segments[ownProps.match.params.sharing_user_id],
      (segment) => segment?.firing_id === ownProps.match.params.shared_firing_id
    ),
    shared_firing:
      state.shared_firings[ownProps.match.params.sharing_user_id]?.[
        ownProps.match.params.shared_firing_id
      ],
  };
  console.log(stateProps);
  return stateProps;
};

export default connect(mapStateToProps)(FiringShowPage);
