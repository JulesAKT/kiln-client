import React from "react";
import { List, Rating, Button, Divider, Image, Icon } from "semantic-ui-react";
import { Link } from "react-router-dom";
import { useFirebaseConnect } from "react-redux-firebase";
import useFirebaseKiln from "../hooks/useFirebaseKiln";
import useFirebaseProject from '../hooks/useFirebaseProject'
import { useSelector } from "react-redux";

import FiringCard from "./FiringCard";
import _ from "lodash";

const ProjectShowPage = (props) => {
  const id = props.match.params.id;
  const uid = useSelector((state) => state.firebase.auth.uid);

  useFirebaseConnect([{ path: `/userdata/${uid}/firings` }]);

  const project = useFirebaseProject(id)
  const kiln = useFirebaseKiln(project && project.kiln);
  const firings = useSelector(
    ({ firebase: { data } }) =>
      data.userdata &&
      data.userdata[uid] &&
      data.userdata[uid].firings &&
      _.filter(data.userdata[uid].firings, (firing) => {
        return firing && firing.project_id === id;
      })
  );

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
        {firings_array &&
          firings_array.map(
            (firing, index) =>
              firing && (
                <Link to={`/firings/${firing.id}`} key={firing.id}>
                  <FiringCard {...firing} index={index} />
                </Link>
              )
          )}

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

export default ProjectShowPage;
