import React from "react";
import { Link } from "wouter";
import { useLocation } from "wouter";

import Favorites from "components/Favorites/Favorites";
import "./Gifs.css";
const Gifs = ({ id, url, title }) => {
  const [, setLocation] = useLocation();
  const sendIdDetail = (evet) => {
    evet.preventDefault();
    setLocation(`/gif/${id}`);
  };
  return (
    <div className="containerGifs">
      <Link to={`/gif/${id}`} className="linkGifs">
        <div className="containerGifWrapper">
          <h3 className="h3Gifs"> {title ? title : "null"} </h3>
          <img
            loading="lazy"
            style={{
              "--colors-ramdon":
                "#" + (((1 << 24) * Math.random()) | 0).toString(16),
            }}
            src={url}
            alt={title}
            onClick={sendIdDetail}
          />

          <Favorites title={title} url={url} id={id} />
        </div>
      </Link>
    </div>
  );
};

export default React.memo(Gifs, (prevProps, nextProps) => {
  return prevProps.id === nextProps.id;
});
