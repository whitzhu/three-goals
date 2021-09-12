import React, { useReducer, createContext } from "react";

export const AuthContext = createContext();

export const AuthContextProvider = (props) => {
  const DEFAULT_DATA_STATE = {
    user: undefined,
  };

  function userReducer(state, action) {
    switch (action.type) {
      case "updateUser":
        return {
          ...state,
          user: action.payload,
        };
      case "logOut":
        return {
          ...DEFAULT_DATA_STATE,
        };
      default:
        break;
    }
  }

  const [userData, dispatch] = useReducer(userReducer, DEFAULT_DATA_STATE);

  return (
    <AuthContext.Provider value={[userData, dispatch]}>
      {props.children}
    </AuthContext.Provider>
  );
};
