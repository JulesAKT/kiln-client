import { useSelector } from "react-redux";

const usePending = () => {
  const pending = useSelector((state) => state.pending);

  return pending;
};

export default usePending;
