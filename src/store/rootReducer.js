const rootReducer = (state, action) => {
  switch (action.type) {
    case "ADD_SEARCHKEY":
      return {
        ...state,
        searchKey: action.payload,
      };
    case "UPDATE_QUANTITY":
      return {
        ...state,
        quantity: action.payload,
      };

    default:
      return state;
  }
};

export default rootReducer;
