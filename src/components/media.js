import React from "react";
import Img from "gatsby-image";

const Media = ({ project, block }) =>
  block.images.map((image, i) => {
    return (
      <div
        className={
          block.layout === "2 columns"
            ? "col-md-6"
            : block.layout === "3 columns"
            ? "col-md-4"
            : "col"
        }
        data-aos="fade-up"
        key={i}
      >
        <figure>
          <Img
            fixed={image.fixed}
            alt={project.title}
            style={{
              display: "block",
              width: "100%",
              height: "auto",
            }}
            imgStyle={{ position: "relative" }}
            placeholderStyle={{ position: "absolute" }}
          />
        </figure>
      </div>
    );
  });

export default Media;
