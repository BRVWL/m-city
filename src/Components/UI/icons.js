import React from 'react';
import { Link } from 'react-router-dom';

export const Icon = ({ link, linkTo, iconSrc, width, height }) => {
  const template = (
    <div
      className="img_cover"
      style={{
        width,
        height,
        background: `url(${iconSrc}) no-repeat`
      }}
    />
  );
  if (link) {
    // code
    return (
      <Link to={linkTo} className="link_logo">
        {template}
      </Link>
    );
  } else {
    return template;
  }
};
