export default (state, action) => {
  switch (action.type) {
    case "PUSH_MARKER":
      return {
        ...state,
        laposition: [action.payload, ...state.laposition],
      };

    case "PUSH_FORM":
      return {
        ...state,
        info: [action.payload, ...state.info],
      };
    case "FORM_VISIBLE":
      return {
        ...state,
        formStatus: action.payload,
      };

    case "FORM_STATUS_FILL":
      return {
        ...state,
        formCorrect: action.payload,
      };

    case "FLY_TO_LOCATION":
      return {
        ...state,
        locationToGo: action.payload,
      };

    case "DEL_FORM":
      return {
        ...state,
        info: action.payload,
      };

    case "ADMIN_LOGIN":
      return {
        ...state,
        isLoggedIn: { admin: action.payload, guest: action.payload },
      };

    case "GUEST_LOGIN":
      return {
        ...state,
        isLoggedIn: { admin: false, guest: action.payload },
      };
  }
};
