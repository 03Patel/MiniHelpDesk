// src/reducers/authReducer.js
export const initialState = {
  isAuthenticated: !!localStorage.getItem("token"),
};

export const authReducer = (state, action) => {
  switch (action.type) {
    case "LOGIN":
      localStorage.setItem("token", action.payload.token);
      return { ...state, isAuthenticated: true };
    case "LOGOUT":
      localStorage.removeItem("token");
      return { ...state, isAuthenticated: false };
    default:
      return state;
  }
};
