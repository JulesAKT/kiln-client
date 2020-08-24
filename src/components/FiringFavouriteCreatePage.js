import React from "react";

import { useDispatch } from "react-redux";
import { List } from "semantic-ui-react";
import { Link } from "react-router-dom";
import FiringCard from "./FiringCard";
import useFirebaseFirings from "../hooks/useFirebaseFirings";
import useFirebaseProject from "../hooks/useFirebaseProject";
import _ from "lodash";
import useFirebaseTemplateFirings from "../hooks/useFirebaseTemplateFirings";

const FiringFavouriteCreatePage = (props) => {
  const dispatch = useDispatch();
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
                  to={`/new_favourite_firing_confirm/${project_id}/${firing.id}`}
                >
                  <FiringCard
                    {...firing}
                    index={index}
                    key={firing.id}
                    hideIndex
                  />
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
                <FiringCard
                  {...firing}
                  key={firing.id}
                  index={index}
                  hideIndex
                />
              )
          )}
      </List>
    </>
  );
};

export default FiringFavouriteCreatePage;
