import { useReducer } from "react";

const reducer = (state, action) => {
  if (action.type === "create") {
    return {
      ...state,
      ...action.payload,
    };
  }

  return state;
};

const initialData = {
  username: "",
  password: "",
};

const useRegister = () => {
  const [state, dispatch] = useReducer(reducer, initialData);

  return {
    ...state,
    createUser: (value) => dispatch({ type: "create", payload: value }),
  };
};

export default useRegister;
