import React from "react";
import { List, Rating, Button, Divider, Image, Icon } from "semantic-ui-react";
import { Link } from "react-router-dom";
import _ from "lodash";
import useFirebaseKiln from "../hooks/useFirebaseKiln";
import useFirebaseProject from "../hooks/useFirebaseProject";
import useFirebaseFirings from "../hooks/useFirebaseFirings";
import { glassImage } from "../helpers/logoHelpers";

import FiringCard from "./FiringCard";

const ProjectShowPage = (props) => {
  const id = props.match.params.id;

  const project = useFirebaseProject(id);
  const kiln = useFirebaseKiln(project && project.kiln);
  const all_firings = useFirebaseFirings();
  const firings = _.filter(
    all_firings,
    (firing) => (firing && firing.project_id) === id
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
  console.log(firings_array);
  return (
    <div>
      {project.photo && <Image avatar src={project.photo} size="medium" />}
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
      {project.notes && <div>Notes: {project.notes}</div>}
      <div>
        <Link to={`/projects/edit/${id}`}>
          <Button>Edit</Button>
        </Link>
        <Link to={`/projects/delete/${id}`}>
          <Button>Delete</Button>
        </Link>
      </div>
      <Divider />
      {Array.isArray(project.photos) &&
        project.photos.map((photo) => (
          <div key={photo.photo}>
            <Image src={photo.photo} />
          </div>
        ))}
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
      </List>
      <div>
        <Link to={`/new_firing/${id}`}>
          <Button>Add Firing</Button>
        </Link>
        <Link to={`/new_favourite_firing/${id}`}>
          <Button>Add Favourite</Button>
        </Link>
      </div>
    </div>
  );
};

export default ProjectShowPage;
