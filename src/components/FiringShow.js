import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { Button, Icon, Card, Header } from "semantic-ui-react";
import DataTable from "react-data-table-component";
import { fetchFiring, fetchSegmentsByFiring, editFiring } from "../actions";
import { useDispatch, useSelector } from "react-redux";
import _ from "lodash";

//import { defined } from "react-native-reanimated";

const FiringShowScreen = (props) => {
  const dispatch = useDispatch();
  const id = props.match.params.id;

  useEffect(() => {
    dispatch(fetchSegmentsByFiring(id));
    dispatch(fetchFiring(id));
  }, [dispatch, id]);
  const firing = useSelector((state) => state.firings[id]);

  const segments = useSelector((state) =>
    _.filter(state.segments, (segment) => {
      return segment.firing_id === id;
    })
  );
  if (!firing) {
    return <div>Loading...</div>;
  }
  /*
  const reorderSegments = ({ data }) => {
    //console.log("reorderSegments");
    //console.log(data);
    data.forEach((element, index) => {
      if (element.order !== index) {
        console.log("Changed entry: " + index);
        element.order = index;
        dispatch(editSegment(data[index].id, element, false));
      }
    });
  };
*/
  const segments_array = Object.values(segments);
  //console.log(segments_array);
  const sorted_segments_array = segments_array.sort((a, b) => {
    return a.order > b.order ? 1 : -1;
  });
  //console.log("Sorted");
  //console.log(sorted_segments_array);
  //navigation.setOptions({ title: `Firing: ${firing.name}` });
  //console.log(segments_array);

  const renderDeleteIcon = () => {
    if (segments_array.length === 0) {
      return (
        <Link to={`/firing/delete/${id}`}>
          <Icon name="trash" type="feather" />
        </Link>
      );
    } else {
      return <Icon name="trash" type="feather" disabled />;
    }
  };

  const renderHeader = () => {
    return (
      <Card>
        <Link to={`/firings/edit/${id}`}>
          <Icon name="edit" type="feather" />
        </Link>
        <Header as="h4">{firing.name}</Header>
        {renderDeleteIcon()}
      </Card>
    );
  };

  const renderFavouriteButton = () => {
    if (!firing.favourite) {
      return (
        <Button
          title="Mark as Favourite"
          onPress={() => {
            firing.favourite = true;
            dispatch(editFiring(id, firing, false));
          }}
        />
      );
    } else {
      return (
        <Button
          title="Unmark as Favourite"
          onPress={() => {
            firing.favourite = false;
            dispatch(editFiring(id, firing, false));
          }}
        />
      );
    }
  };

  const columns = [
    {
      name: "Name",
      selector: "text",
      sortable: false,
      cell: (row) => <div>{row.name}</div>,
    },
    {
      name: "Rate",
      selector: "integer",
      sortable: false,
      cell: (row) => <div>{row.rate}</div>,
    },
    {
      name: "Temperature",
      selector: "integer",
      sortable: false,
      cell: (row) => <div>{row.rate}</div>,
    },
    {
      name: "Hold",
      selector: "integer",
      sortable: false,
      cell: (row) => <div>{row.hold}</div>,
    },
  ];

  return (
    <div>
      <Card>
        <Card.Header textaAlign="center">{renderHeader()}</Card.Header>
        <DataTable>
          title="Segments" columns={columns}
          data={sorted_segments_array}
          defaultSortField="order"
        </DataTable>
        <Link to={`/new_segment/${id}`}>
          <Icon name="add" />
          Add Segment
        </Link>
      </Card>
      {renderFavouriteButton()}
    </div>
  );
};

export default FiringShowScreen;

/* Header:
 */

/* Footer:
 */
