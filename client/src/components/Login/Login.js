import { useEffect } from "react";
import { Button } from "antd";
import { useLocation } from "wouter";

import useUser from "../../context/useUser";
import useLogin from "./hook";
import "./main.css";

//utilzar useReducer

const Login = ({ onLogin }) => {
  const { userName, password, updateUsername, updatePassword } = useLogin();
  const { login, isLogin, isLoadinLogin, isErrorLogin } = useUser();

  const [, setLocation] = useLocation();

  useEffect(() => {
    if (isLogin) {
      setLocation("/");
      onLogin && onLogin();
    }
  }, [isLogin, setLocation, onLogin]);

  const handleSubmit = (evt) => {
    evt.preventDefault();
    login({ userName, password });
  };

  return (
    <div className="containerLoginCard">
      <span>Login</span>
      {isLoadinLogin ? (
        <strong>Checking you credentials</strong>
      ) : (
        <form onSubmit={handleSubmit}>
          <input
            placeholder="userName"
            id="userName"
            value={userName}
            onChange={(e) => updateUsername(e.target.value)}
          />
          <input
            placeholder="password"
            id="password"
            value={password}
            onChange={(e) => updatePassword(e.target.value)}
          />
          <Button className="btnHomeSend" htmlType="submit">
            Send
          </Button>
        </form>
      )}
      {isErrorLogin && <strong>Credentials invalids</strong>}
    </div>
  );
};

export default Login;
