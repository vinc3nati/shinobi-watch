import React from "react";
import { LazyLoadImage } from "react-lazy-load-image-component";
import { Link } from "react-router-dom";

export const HomeBanner = ({
  image,
  title,
  description,
  navigateTo,
  reversed,
}) => {
  return (
    <div className="home-banner-container">
      <div
        className="home-banner"
        style={{ flexDirection: reversed ? "row-reverse" : "row" }}
      >
        <div
          className={`banner-img-container ${reversed ? "m-left" : "m-right"}`}
        >
          <LazyLoadImage src={image} className={"banner-img"} alt="banner" />
        </div>
        <div className="text-container">
          <h2 className="text-primary">{title}</h2>
          <h6>{description}</h6>
          <Link to={navigateTo} className="btn outline-primary">
            watch now
          </Link>
        </div>
      </div>
    </div>
  );
};
