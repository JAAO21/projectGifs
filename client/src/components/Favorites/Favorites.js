import { useCallback, useState, useEffect } from "react";
import { Button, Tabs } from "antd";
/* import { useLocation } from "wouter"; */
import useUser from "context/useUser";

import Modal from "components/Modal/Modal";
import LoginToUser from "components/Login/Login";
import RegisterUser from "components/Register/Register";

import "./index.css";

const Favorites = ({ title, url, id }) => {
  const {
    isLogin,
    addFavorites,
    isFavorite,
    deleteFavorites,
    allFavoriteGifs,
    jwt,
  } = useUser();
  const [showModal, setShowModal] = useState(false);
  /* const [, setLocation] = useLocation() */

  const { TabPane } = Tabs;
  //mostrar gif de cargando y eliminado con setTimer
  const isFav = isLogin ? isFavorite({ id }) : false;

  const [label, emoji] = isFav
    ? ["Remove Gif from favorites", "(Ծ ‸ Ծ)"]
    : ["Add Gif from favorites", "🌟"];
  const handleClose = useCallback(() => {
    setShowModal(false);
  }, [setShowModal]);

  const handleClick = (evt) => {
    evt.preventDefault();
    if (!isLogin) {
      //  setLocation('/login')
      setShowModal(true);
    } else if (!isFav) {
      addFavorites({ title, url, id });
      alert("Add to favorites");
    } else {
      deleteFavorites({ id });
      alert("elimiar en proceso");
    }
  };

  const handleLogin = () => {
    setShowModal(false);
  };

  useEffect(() => {
    if (isLogin && jwt) {
      allFavoriteGifs({ token: jwt });
    }
  }, [isLogin, jwt, allFavoriteGifs]);

  return (
    <>
      <Button onClick={handleClick} className="btnFavorite">
        <span
          aria-label={label}
          role="img"
          style={{
            "--colors-ramdon":
              "#" + (((1 << 24) * Math.random()) | 0).toString(16),
          }}
        >
          {emoji}
        </span>
      </Button>
      {showModal && (
        <Modal onClose={handleClose}>
          <Tabs defaultActiveKey="1" centered>
            <TabPane tab="Login" key="1">
              <LoginToUser onLogin={handleLogin} />
            </TabPane>
            <TabPane tab="register" key="2">
              <RegisterUser />
            </TabPane>
          </Tabs>
        </Modal>
      )}
    </>
  );
};

export default Favorites;
