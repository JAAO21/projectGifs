import { useReducer } from "react";

const reducer = (state, action) => {
  if (action.type === "userName") {
    return {
      ...state,
      userName: action.payload,
    };
  } else if (action.type === "password") {
    return { ...state, password: action.payload };
  }
  return state;
};

const useLogin = () => {
  const [state, dispatch] = useReducer(reducer, {
    userName: "",
    password: "",
  });

  const { userName, password } = state;

  return {
    userName,
    password,
    updateUsername: (userName) =>
      dispatch({ type: "userName", payload: userName }),
    updatePassword: (password) =>
      dispatch({ type: "password", payload: password }),
  };
};

export default useLogin;
