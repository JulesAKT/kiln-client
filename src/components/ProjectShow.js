import React, { useEffect } from "react";
//import { ScrollView, Alert, FlatList, InteractionManager } from "react-native";
//import { StyleSheet, View } from "react-native";
//import { ListItem, Button, Divider, Text } from "react-native-elements";
import { List, Rating, Button, Divider, Image, Icon } from "semantic-ui-react";
import { Link } from "react-router-dom";
import {
  fetchKiln,
  fetchProject,
  // fetchFirings,
  fetchFiringsByProject,
} from "../actions";
import { useDispatch, useSelector } from "react-redux";
//import StarRating from "react-native-star-rating";
import FiringCard from "../components/FiringCard";
import _ from "lodash";
//import { TouchableOpacity } from "react-native-gesture-handler";

const ProjectShowScreen = (props) => {
  const dispatch = useDispatch();
  const id = props.match.params.id;

  useEffect(() => {
    dispatch(fetchProject(id));
  }, [dispatch, id]);

  useEffect(() => {
    dispatch(fetchFiringsByProject(id));
  }, [dispatch, id]);

  const project = useSelector((state) => state.projects[id]);
  //const refreshing = useSelector((state) => state["FETCH_PROJECTS"].pending);

  useEffect(() => {
    if (project) {
      dispatch(fetchKiln(project.kiln));
    }
  }, [dispatch, project]);

  const firings = useSelector((state) => {
    //console.log(state.firings);
    //console.log("looking for: " + id);
    const filtered_firings = _.filter(state.firings, (firing) => {
      return firing.project_id === id;
    });
    //console.log(filtered_firings);
    return filtered_firings;
  });
  const kiln = useSelector((state) => project && state.kilns[project.kiln]);

  let firings_array;
  if (firings) {
    firings_array = Object.values(firings).sort((a, b) => {
      return a.name.localeCompare(b.name) ? -1 : 1;
    });
  }
  if (!kiln || !project) {
    return <div>Loading...</div>;
  }

  const glassImage = (glass) => {
    switch (glass) {
      case "Spectrum":
        return require("../assets/spectrum.jpg");
      case "Bullseye":
      default:
        return require("../assets/bullseye.jpg");
    }
  };

  return (
    <div>
      <div>
        Kiln:<span>{kiln.name}</span>
        <span>
          <Image avatar src={glassImage(project.glass)} />
        </span>
      </div>
      <div>
        <span>
          <Icon name="move" />
        </span>
        <span>
          {`${project.width}x${project.depth}x${project.thickness}(mm)`}
        </span>
      </div>
      <div>
        Rating:
        <Rating maxRating={5} rating={project.stars} disabled={true} />
      </div>
      <div>
        <Link to={`/projects/edit/${id}`}>
          <Button>Edit</Button>
        </Link>
        <Link to={`/projects/delete/${id}`}>
          <Button>Delete</Button>
        </Link>
      </div>
      <Divider />
      <List>
        <List.Header>Firings</List.Header>
        {firings_array.map((firing, index) => (
          <Link to={`/firings/${firing.id}`} key={firing.id}>
            <FiringCard {...firing} index={index} />
          </Link>
        ))}

        <div>
          <Link to={`/new_firing/${id}`}>
            <Button>Add Firing</Button>
          </Link>
          <Link to="'/new_favourite_firing">
            <Button>Add Favourite</Button>
          </Link>
        </div>
      </List>
    </div>
  );
};

export default ProjectShowScreen;
