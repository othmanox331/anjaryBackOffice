import { LOGIN, LOGOUT } from "./types";

const initialState = {
  isLogged: true,
  user: null,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case LOGIN:
      return {
        ...state,
        user: { ...action.payload },
        isLogged: true,
      };
    case LOGOUT: {
      return { ...state, isLogged: false, user: null };
    }
    default:
      return state;
  }
};
