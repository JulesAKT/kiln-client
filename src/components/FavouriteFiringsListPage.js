import React from "react";
import { List } from "semantic-ui-react";
import { Link } from "react-router-dom";
import useFirebaseFirings from "../hooks/useFirebaseFirings";
import _ from "lodash";

import FiringCard from "./FiringCard";

const FavouriteFiringsListPage = () => {
  const firings = useFirebaseFirings();
  if (!firings) {
    return <div>Loading...</div>;
  }

  const favourite_firings = _.filter(firings, (firing) => firing.favourite);
  const favourite_firings_array =
    favourite_firings && Object.values(favourite_firings.map((a) => a));

  return (
    <div>
      <List>
        <List.Header>Favourite Firings</List.Header>
        {favourite_firings_array &&
          favourite_firings_array.map(
            (firing, index) =>
              firing && (
                <Link to={`/firings/${firing.id}`} key={firing.id}>
                  <FiringCard {...firing} index={index} />
                </Link>
              )
          )}
      </List>
    </div>
  );
};

export default FavouriteFiringsListPage;
