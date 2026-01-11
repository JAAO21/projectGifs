import { Redirect } from "wouter";
import { Helmet } from "react-helmet";
import { ArrowLeftOutlined } from "@ant-design/icons";
import { Button } from "antd";
import { useLocation } from "wouter";

import Spinner from "components/Spinner/Spinner";
import Favorite from "components/Favorites/Favorites";
import useSingleGifs from "hooks/useSingleGifs";

import "./detail.css";

export const Detail = (props) => {
  const [, setLocation] = useLocation();
  const { id } = props.params;
  const { gif, isLoading, isError } = useSingleGifs({ id });

  if (isLoading)
    return (
      <>
        <Helmet>
          <title>Cargando ...</title>
        </Helmet>
        <Spinner />
      </>
    );

  if (isError) return <Redirect to="/404" />;

  if (!gif) return null;

  return (
    <div className="detail-container">
      <Helmet>
        <title>{gif ? `${gif.title} || Gifi` : ""}</title>
      </Helmet>
      <h2 className="detail-title">Aquí está tu gif 🎉</h2>
      <div className="detail-content">
        <img
          className="detail-img"
          src={gif.url}
          alt={gif.title}
          loading="lazy"
        />
        <h3 className="detail-text">{gif.title}</h3>
      </div>
      <div className="detail-buttons">
        <Favorite />
        <Button
          type="dashed"
          style={{ backgroundColor: "transparent" }}
          icon={<ArrowLeftOutlined />}
          onClick={() => setLocation("/")}
        />
      </div>
    </div>
  );
};
