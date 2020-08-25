import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { Button, Icon, Segment, Header, Table, Ref } from "semantic-ui-react";
import FiringGraph from "./FiringGraph";
import TinyRoomForm from "./tinyFiringForm";
import {
  fetchFiring,
  fetchSegmentsByFiring,
  editFiring,
  editSegment,
} from "../actions";

//import SegmentRow from "./SegmentRow";
//import { DropTarget } from "react-dnd";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import _ from "lodash";

//import { defined } from "react-native-reanimated";

class FiringShowPage extends Component {
  constructor(props) {
    super(props);
    this.state = { isEditing: false };
  }
  componentDidMount() {
    this.props.dispatch(fetchSegmentsByFiring(this.props.match.params.id));
    this.props.dispatch(fetchFiring(this.props.match.params.id));
  }

  render() {
    const firing = this.props.firing;
    const segments = this.props.segments;
    const id = this.props.match.params.id;

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

    const segments_array = Object.values(segments);

    const sorted_segments_array = segments_array.sort((a, b) => {
      return a.order > b.order ? 1 : -1;
    });

    const renderDeleteIcon = () => {
      if (segments_array.length === 0) {
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
    const editClicked = () => {
      this.setState({ isEditing: !this.state.isEditing });
    };
    const onSubmit = (formValues) => {
      this.props.dispatch(editFiring(firing.id, formValues, false));
      this.setState({ isEditing: false });
    };

    const renderHeader = () => {
      return (
        <Header as="h3" attached="top">
          <Icon
            name="edit"
            type="feather"
            onClick={editClicked}
            floated="left"
          />
          <Header.Content>
            {this.state.isEditing ? (
              <TinyRoomForm
                initialValues={{ ...firing }}
                formName={`tinyroomform-${firing.id}`}
                onSubmit={onSubmit}
              />
            ) : (
              <>{firing.name}</>
            )}
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
      if (!result.destination) {
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
                  <Table.HeaderCell>Rate</Table.HeaderCell>
                  <Table.HeaderCell>Temperature</Table.HeaderCell>
                  <Table.HeaderCell>Hold</Table.HeaderCell>
                  <Table.HeaderCell>Actions</Table.HeaderCell>
                </Table.Row>
              </Table.Header>
              <Droppable droppableId="segments_table">
                {(provided, snapshot) => (
                  <Ref innerRef={provided.innerRef}>
                    <Table.Body
                      {...provided.droppableProps}
                      style={getListStyle(snapshot.isDraggingOver)}
                    >
                      {sorted_segments_array.map((segment, index) => {
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

            <Link
              to={`/new_segment/${id}/${
                Math.max(...sorted_segments_array.map((s) => s.order), 0) + 1
              }`}
            >
              <Icon name="add" />
              Add Segment
            </Link>
          </Segment>

          {renderFavouriteButton()}
        </div>
        <FiringGraph sortedSegments={sorted_segments_array} />
      </DragDropContext>
    );
  }
}

const mapStateToProps = (state, ownProps) => {
  return {
    segments: _.filter(state.segments, (segment) => {
      return segment.firing_id === ownProps.match.params.id;
    }),
    firing: state.firings[ownProps.match.params.id],
  };
};

export default connect(mapStateToProps)(FiringShowPage);
