import { useEffect } from "react";
import { useDispatch } from "react-redux";

import { useTypedSelector } from "../reducers";
import { fetchBartlettKiln } from "../actions";

const useBartlett = (
  id: string,
  username: string,
  password: string,
  datestamp: number = 0
) => {
  //console.log(`useBartlett - ${id}, ${username}, ${password}`);
  const bartlett = useTypedSelector((state) => state.bartlett);
  const dispatch = useDispatch();
  useEffect(() => {
    id && username && dispatch(fetchBartlettKiln(id, username, password));
  }, [id, username, password, datestamp, dispatch]);

  return bartlett?.kilns?.[id];
};

export default useBartlett;
