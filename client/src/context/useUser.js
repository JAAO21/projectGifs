import { useContext, useCallback, useReducer } from "react";
import Api from "../services/Api";
import Context from "./UserContext";
import { useErrors } from "../hooks/useErrors";

const initalState = {
  login: { loading: false, error: false },
  register: { loading: false, error: false, message: "" },
  favoriteGif: { loading: false, error: false, message: "" },
  allGifs: { loading: false, error: false, message: "" },
  deletGif: { loading: false, error: false, message: "" },
};
function reducer(state, action) {
  switch (action.type) {
    case "LOGIN_START":
      return { ...state, login: { loading: true, error: false } };
    case "LOGIN_SUCCESS":
      return { ...state, login: { loading: false, error: false } };
    case "LOGIN_ERROR":
      return { ...state, login: { loading: false, error: true } };

    case "REGISTER_START":
      return {
        ...state,
        register: { loading: true, error: false, message: "" },
      };
    case "REGISTER_SUCCESS":
      return {
        ...state,
        register: {
          loading: false,
          error: false,
          message: "Usuario creado con éxito",
        },
      };
    case "REGISTER_ERROR":
      return {
        ...state,
        register: { loading: false, error: true, message: action.payload },
      };

    case "ALL_GIFS_START":
      return {
        ...state,
        allGifs: { loading: true, error: false, message: "Cargando Gifs" },
      };
    case "ALL_GIFS_SUCCESS":
      return {
        ...state,
        allGifs: { loading: false, error: false, message: "Todos los gifs" },
      };
    case "ALL_GIFS_ERROR":
      return {
        ...state,
        allGifs: { loading: false, error: true, message: action.payload },
      };
    case "FAVORITE_GIFS_START":
      return {
        ...state,
        favoriteGif: {
          loading: true,
          error: false,
          message: "Cargando favoritos Gifs",
        },
      };
    case "FAVORITE_GIFS_SUCCESS":
      return {
        ...state,
        favoriteGif: {
          loading: false,
          error: false,
          message: "Añadido a favoritos",
        },
      };
    case "FAVORITE_GIFS_ERROR":
      return {
        ...state,
        favoriteGif: { loading: false, error: true, message: action.payload },
      };
    case "DELETE_GIFS_START":
      return {
        ...state,
        deletGif: {
          loading: true,
          error: false,
          message: "Eliminando gif",
        },
      };
    case "DELETE_GIFS_SUCCESS":
      return {
        ...state,
        deletGif: {
          loading: false,
          error: false,
          message: "Gif eliminado ",
        },
      };
    case "DELETE_GIFS_ERROR":
      return {
        ...state,
        deletGif: { loading: false, error: true, message: action.payload },
      };
    default:
      return state;
  }
}

const useUser = () => {
  const { jwt, setJwt, favorite, setFavorite } = useContext(Context);
  const [state, dispatch] = useReducer(reducer, initalState);
  const { setErrors } = useErrors();

  const allFavoriteGifs = useCallback(
    ({ token }) => {
      dispatch({ type: "ALL_GIFS_START" });
      Api({ type: "get", path: "api/favoriteGifs/allFavGif", token })
        .then((data) => {
          if (data.httpStatus === 200 && data.status) {
            console.log(data);
            setFavorite(data.gifs);
            dispatch({ type: "ALL_GIFS_SUCCESS" });
          } else {
            dispatch({
              type: "ALL_GIFS_ERROR",
              payload: data.errors || "Error gifs favorites",
            });
            setFavorite([]);
            setErrors(data.errors);
          }
        })
        .catch((error) => {
          console.log(error.message);
          setErrors(error.message);
          dispatch({
            type: "ALL_GIFS_ERROR",
            payload: error.message || "Error gifs favorites",
          });
        });
    },
    [setFavorite, setErrors, dispatch, Api]
  );

  const login = useCallback(
    ({ userName, password }) => {
      dispatch({ type: "LOGIN_START" });
      Api({
        type: "post",
        path: "api/auth/signIn",
        data: { userName, password },
      })
        .then((data) => {
          if (data.httpStatus === 200 && data.status) {
            window.sessionStorage.setItem("jwt", data.token);
            setJwt(data.token);
            dispatch({ type: "LOGIN_SUCCESS" });
            console.log("entro", data.token);
          } else {
            dispatch({
              type: "LOGIN_ERROR",
              payload: data.errors || "Error login",
            });
            setErrors(data.errors);
          }
        })
        .catch((error) => {
          console.log(error.message);
          window.sessionStorage.removeItem("jwt");
          setErrors(error.message);
          dispatch({
            type: "LOGIN_ERROR",
            payload: error.message || "Error login",
          });
        });
    },
    [setJwt, setErrors, dispatch]
  );

  const register = useCallback(
    (data) => {
      dispatch({ type: "REGISTER_START" });
      Api({ type: "post", path: "api/auth/signUp", data })
        .then((res) => {
          if (data.httpStatus === 200 && data.status) {
            dispatch({ type: "REGISTER_SUCCESS" });
          } else {
            dispatch({
              type: "REGISTER_ERROR",
              payload: res.errors || "Error en registro",
            });
            console.log(res.errors);
            setErrors(res.errors);
          }
        })
        .catch((error) => {
          console.error(error.message);
          setErrors(error.message);
          dispatch({
            type: "REGISTER_ERROR",
            payload: error.message || "Error register",
          });
        });
    },
    [setErrors, dispatch]
  );

  const addFavorites = useCallback(
    ({ title, url, id }) => {
      dispatch({ type: "FAVORITE_GIFS_START" });
      const data = { title, url, code: id };
      Api({
        type: "post",
        path: "api/favoriteGifs/createFavGif",
        data,
        token: jwt,
      })
        .then((res) => {
          if (res.httpStatus === 201 && res.status) {
            setFavorite((prev) => [...prev, res.gif]);
            dispatch({ type: "FAVORITE_GIFS_SUCCESS" });
          } else if (res.httpStatus === 409) {
            dispatch({
              type: "FAVORITE_GIFS_ERROR",
              payload: "Este gif ya está en tus favoritos",
            });
          } else {
            dispatch({
              type: "FAVORITE_GIFS_ERROR",
              payload: res.errors || "Error favorites gifs",
            });
            setErrors(res.errors);
          }
        })
        .catch((error) => {
          console.log(error.message);
          setErrors(error.message);
          dispatch({
            type: "FAVORITE_GIFS_ERROR",
            payload: error.message || "Error favorites gifs",
          });
        });
    },
    [jwt, allFavoriteGifs]
  );

  const deleteFavorites = ({ id }) => {
    dispatch({ type: "DELETE_GIFS_START" });
    Api({
      type: "put",
      path: `api/favoriteGifs/deleteFavoriteGif?code=${id}`,
      token: jwt,
    })
      .then((res) => {
        if (res.httpStatus === 200 && res.status) {
          allFavoriteGifs({ token: jwt });
          dispatch({ type: "DELETE_GIFS_SUCCESS" });
        } else {
          dispatch({
            type: "DELETE_GIFS_ERROR",
            payload: res.errors || "Error gifs favorites delete",
          });
          setErrors(res.errors);
        }
      })
      .catch((error) => {
        console.log(error.message);
        setErrors(error.message);
        dispatch({
          type: "DELETE_GIFS_ERROR",
          payload: error.message || "Error gifs favorites delete",
        });
      });
  };

  const logout = useCallback(() => {
    //logout session
    window.sessionStorage.removeItem("jwt");
    setJwt(null);
  }, [setJwt]);

  const isFavorite = useCallback(
    ({ id }) => {
      if (favorite?.length > 0)
        return favorite?.some((favoriteId) => favoriteId.code === id) ?? false;
    },
    [favorite]
  );

  return {
    favorite,
    allFavoriteGifs,
    isLogin: Boolean(jwt),
    isLoadinLogin: state.login.loading,
    isErrorLogin: state.login.error,
    isLoadinRegister: state.register.loading,
    isErrorRegister: state.register.error,
    messageRegister: state.register.message,
    isLoadinFavoriteGif: state.favoriteGif.loading,
    isErrorFavoriteGif: state.favoriteGif.error,
    messageFavoriteGif: state.favoriteGif.message,
    isLoadinAllGifs: state.allGifs.loading,
    isErrorAllGifs: state.allGifs.error,
    messageAllGifs: state.allGifs.message,
    isLoadinDeletGif: state.deletGif.loading,
    isErrorDeletGif: state.deletGif.error,
    messageDeletGif: state.allGifs.message,
    login,
    register,
    logout,
    addFavorites,
    deleteFavorites,
    isFavorite,
    jwt,
  };
};

export default useUser;
