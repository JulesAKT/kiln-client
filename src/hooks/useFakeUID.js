import { useSelector } from "react-redux";

const useFakeUID = () => {
  const fakeUID = useSelector((state) => state.fakeUID.uid);

  return fakeUID;
};

export const useFakedUID = () => {
  const real_uid = useSelector((state) => state.firebase.auth.uid);
  const virtual_uid = useFakeUID();
  const uid = virtual_uid ? virtual_uid : real_uid;
  return uid;
};
export default useFakeUID;
