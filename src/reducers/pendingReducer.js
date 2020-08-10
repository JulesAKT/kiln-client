const pendingReducer = (state = {}, action) => {
  const { type } = action;
  const actionName = getActionName(type);

  if (!actionName) {
    return {
      ...state,
    };
  }

  if (type.endsWith("_REQUEST")) {
    return {
      ...state,
      [actionName]: {
        pending: true,
      },
    };
  }

  if (type.endsWith("_SUCCESS") || type.endsWith("_FAILURE")) {
    return {
      ...state,
      [actionName]: {
        pending: false,
      },
    };
  }

  return {
    ...state,
  };
};

function getActionName(actionType) {
  if (typeof actionType !== "string") {
    return null;
  }

  return actionType.split("_").slice(0, -1).join("_");
}

export default pendingReducer;
