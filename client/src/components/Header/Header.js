import { useLocation } from "wouter";
import { Button } from "antd";

import useUser from "../../context/useUser";

import "./index.css";

const Header = () => {
  const { isLogin, logout } = useUser();

  const [navigate] = useLocation();

  const handleClick = (evt) => {
    evt.preventDefault();
    logout();
    navigate("/");
  };

  if (!isLogin) return null;

  return (
    <div className="containerLogout">
      <Button type="link" onClick={handleClick}>
        Salir
      </Button>
    </div>
  );
};

export default Header;
