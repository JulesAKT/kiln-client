import React, { Component } from "react";
import { Table } from "semantic-ui-react";
import { DragSource } from "react-dnd";
import { ItemTypes } from "../actions/types";
class SegmentRow extends Component {
  render() {
    const style = {
      cursor: "move",
    };
    const segment = this.props.segment;
    return (
      <Table.Row {...this.props.draggableProps} {...this.props.dragHandleProps}>
        <Table.Cell>{segment.name}</Table.Cell>
        <Table.Cell>{segment.rate}</Table.Cell>
        <Table.Cell>{segment.temperature}</Table.Cell>
        <Table.Cell>{segment.hold}</Table.Cell>
      </Table.Row>
    );
  }
}

/* export default DragSource(
  ItemTypes.SEGMENT,
  {
    beginDrag: (props) => ({ name: props.name, onDrop: props.onDrop }),
    endDrag(props, monitor) {
      const item = monitor.getItem();
      const dropResult = monitor.getDropResult();
      if (dropResult) {
        console.log(`You dropped ${item.name} into ${dropResult.id}!`);
        props.onDrop(props.id, dropResult.id);
      }
    },
  },
  (connect, monitor) => ({
    connectDragSource: connect.dragSource(),
    isDragging: monitor.isDragging(),
  })
)(SegmentRow);
*/

export default SegmentRow;
