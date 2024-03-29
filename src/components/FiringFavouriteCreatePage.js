import React from "react";

import { List } from "semantic-ui-react";
import { Link } from "react-router-dom";
import FiringCard from "./FiringCard";
import useFirebaseFirings from "../hooks/useFirebaseFirings";
import useFirebaseProject from "../hooks/useFirebaseProject";
import useFirebaseTemplateFirings from "../hooks/useFirebaseTemplateFirings";
import _ from "lodash";

const FiringFavouriteCreatePage = (props) => {
  const project_id = props.match.params.id;
  const project = useFirebaseProject(project_id);
  const all_firings = useFirebaseFirings();
  const template_firings = useFirebaseTemplateFirings(project && project.glass);
  console.log(template_firings);
  const favourite_firings = _.filter(all_firings, (firing) => firing.favourite);
  const favourite_firings_array =
    favourite_firings && Object.values(favourite_firings);
  const template_firings_array =
    template_firings && Object.values(template_firings);
  return (
    <>
      <List>
        <List.Header as="h3">Favourite Firings</List.Header>
        {favourite_firings_array &&
          favourite_firings_array.map(
            (firing, index) =>
              firing && (
                <Link
                  key={firing.id}
                  to={`/copy_favourite_firing_confirm/${project_id}/${firing.id}`}
                >
                  <FiringCard {...firing} index={index} hideIndex />
                </Link>
              )
          )}
      </List>
      <List>
        <List.Header as="h3">Template Firings</List.Header>
        {template_firings_array &&
          template_firings_array.map(
            (firing, index) =>
              firing && (
                <Link
                  key={firing.id}
                  to={`/copy_template_firing_confirm/${project_id}/${firing.id}/${project.glass}`}
                >
                  <FiringCard {...firing} index={index} hideIndex />
                </Link>
              )
          )}
      </List>
    </>
  );
};

export default FiringFavouriteCreatePage;
