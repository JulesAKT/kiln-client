import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchBartlettKiln } from "../actions";

const useBartlett = (id, username, password) => {
  console.log(`useBartlett - ${id}, ${username}, ${password}`);
  const bartlett = useSelector((state) => state.bartlett);
  const dispatch = useDispatch();
  useEffect(() => {
    id && username && dispatch(fetchBartlettKiln(id, username, password));
  }, [id, username, dispatch]);
  return bartlett?.kilns?.[id];
};

export default useBartlett;
